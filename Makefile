API_KEY = $(shell more wu.key)
CITY = Boston
STATE = MA

RESOURCES = conditions hourly
$(foreach res, ${RESOURCES}, fetch_${res}): fetch_%: ${CITY}_${STATE}.%.json

${CITY}_${STATE}.%.json: fetch_wu_api
	./fetch_wu_api ${API_KEY} $* ${CITY} ${STATE} $@

clean_resources:
	rm *.json
