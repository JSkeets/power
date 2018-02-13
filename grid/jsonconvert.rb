
require 'nokogiri'
require 'byebug'
f = File.open("./app/assets/config/AviationData.xml")
doc = Nokogiri::XML(f)
events = doc.xpath("//*[@EventId]")

data = {}
eventsArr = [];
events.each do |event|
    obj = {
        id: event.attr("EventId"),
        location: event.attr("Location"),
        investigationType: event.attr("InvestigationType"),
        accidentNumber: event.attr("AccidentNumber"),
        eventDate: event.attr("EventDate"),
        country: event.attr("Country"),
        latitude: event.attr("Latitude"),
        longitude: event.attr("Longitude"),
        airportCode: event.attr("AirportCode"),
        airportName: event.attr("AirportName"),
        injurySeverity: event.attr("InjurySeverity"),
        aircraftDamage: event.attr("AircraftDamage"),
        aircraftCategory: event.attr("AircraftCategory"),
        registrationNumber: event.attr("RegistrationNumber"),
        make: event.attr("Make"),
        model: event.attr("Model"),
        amateur: event.attr("AmateurBuilt"),
        numEngines: event.attr("NumberOfEngines"),
        engineType: event.attr("EngineType"),
        farDescription: event.attr("FARDescription"),
        schedule: event.attr("Schedule"),
        purpose: event.attr("PurposeOfFlight"),
        airCarrier: event.attr("AirCarrier"),
        totalFatal: event.attr("TotalFatalInjuries"),
        totalSerious: event.attr("TotalSeriousInjuries"),
        totalMinor: event.attr("TotalMinorInjuries"),
        totalUninjured: event.attr("TotalUninjured"),
        weatherCondition: event.attr("WeatherCondition"),
        phase: event.attr("BroadPhaseOfFlight"),
        reportStatus: event.attr("ReportStatus"),
        publicationDate: event.attr("PublicationDate")
    }

    eventsArr.push(obj)
    obj = {}
end

data[:events] = eventsArr



# File.open("./app/assets/config/AviationData.json","w") do |f|
#   f.write(data)
# end






