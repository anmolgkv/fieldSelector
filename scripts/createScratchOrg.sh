#!/bin/bash
source `dirname $0`/config.sh

execute() {
  $@ || exit
}

if [ -z "$DEV_HUB_URL" ]; then
  echo "set default devhub user"
  execute sfdx force:config:set defaultdevhubusername=$DEV_HUB_ALIAS

  echo "deleting old scratch org"
  sfdx force:org:delete -p -u $SCRATCH_ORG_ALIAS
fi

echo "Creating scratch ORG"
execute sfdx force:org:create -a $SCRATCH_ORG_ALIAS -s -f ./config/project-scratch-def.json -d 30

echo "Pushing changes to scratch org"
execute sfdx force:source:push

sfdx force:org:open -p /c/TestApp.app?objectName=Opportunity
# echo "Running apex tests"
# execute sfdx force:apex:test:run -l RunLocalTests -w 30