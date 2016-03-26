API_KEY = $(shell more wu.key)
CITY = Boston
STATE = MA

DATA_DIR = $(shell pwd)/data

RESOURCES = conditions hourly
$(foreach res, ${RESOURCES}, fetch_${res}): fetch_%: $(DATA_DIR)/${CITY}_${STATE}.%.json
fetch_all: $(foreach res, $(RESOURCES), fetch_$(res))

${CITY}_${STATE}.%.json: fetch_wu_api
	./fetch_wu_api ${API_KEY} $(notdir $*) ${CITY} ${STATE} $@

clean_resources:
	rm $(DATA_DIR)/*.json
