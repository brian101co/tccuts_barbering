def services_as_p(services):
    service_html = ''
    for service in services:
        service_html += f"<p>Service: { service['title'] }</p>"
    return service_html