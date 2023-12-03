#!/bin/bash

# Define the command to be executed
COMMAND="npx ts-node src/index.ts"

# Loop 30 times
for i in {1..30}
do
   echo "Execution $i"
   $COMMAND
   sleep 5
done

echo "Completed 30 executions."