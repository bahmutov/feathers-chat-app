# copies messages and users from
# one deploy into another one
FROM_HOST=https://feathers-chat-app-bjvchlmelf.now.sh
DEST_HOST=https://feathers-chat-app-ynqrxllnic.now.sh
TOKEN=ebd2d309-83d2-4857-8b02-b933c480c1a9
SERVICES=messages users

for NAME in messages users
do
  FILENAME=$NAME.db
  echo Copying $NAME to $FILENAME
  http $FROM_HOST/db-dump/$NAME \
    dumb-db-secret:$TOKEN > $FILENAME
  # we could transform the data here
  # for example adjusting its schema
  http -f POST $DEST_HOST/db-set \
    dumb-db-secret:$TOKEN \
    service=$NAME \
    db=@$FILENAME
done

