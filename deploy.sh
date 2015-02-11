#!/bin/bash

RETVAL=0

case "$1" in
  "")
      echo "Usage: $0 [test|live]"
      RETVAL=1
      ;;
  test)
      echo "No test server defined. Deploy failed."
      ;;
  live)
      rsync -av --exclude 'wiki' --exclude '.git' . alic@hodgers.com:~/ali.craigmile.com/
      ;;
esac

exit $RETVAL
