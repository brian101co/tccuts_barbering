import datetime
import math
from .models import Schedule, Reservation

def get_time_delta(t1, t2):
    hour_delta = t2.hour - t1.hour
    min_delta = t2.minute - t1.minute
    return hour_delta + min_delta / 60 

def getAllTimeBlocks(start, end, time_block):
    hours = get_time_delta(start, end)
    timeblocks = []
    
    for i in range(int(hours / time_block)):
        start_time = start.hour + time_block * i
        end_time = start_time + time_block
        timeblocks.append({"start_time": start_time, "end_time": end_time})
    return timeblocks

def getOpenings(date, qs):
    schedule = Schedule.objects.first()
    week_day_lookup = {
        0: "monday",
        1: "tuesday",
        2: "wednesday",
        3: "thursday",
        4: "friday",
        5: "saturday",
        6: "sunday",
    }
    weekday = week_day_lookup[date.weekday()]
    if getattr(schedule, f"{weekday}_time_block") == None:
        return []
    time_block = float(getattr(schedule, f"{weekday}_time_block"))
    start = getattr(schedule, f"{weekday}_start")
    end = getattr(schedule, f"{weekday}_end")
    all_timeblocks = getAllTimeBlocks(start=start, end=end, time_block=time_block)

    if not qs.exists():
        return all_timeblocks

    for reservation in qs:
        for timeblock in all_timeblocks:
            if reservation.start.hour == math.floor(timeblock["start_time"]) and reservation.start.minute == (timeblock["start_time"] % 1) * 60:
                if reservation.end.hour == math.floor(timeblock["end_time"]) and reservation.end.minute == (timeblock["end_time"] % 1) * 60:
                    all_timeblocks.remove(timeblock)
                    break
    return all_timeblocks
    