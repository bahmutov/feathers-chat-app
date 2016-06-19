# copies messages and users from
# one deploy into another one
FROM_HOST=localhost:3030
TO_HOST=localhost:3030
TOKEN=ebd2d309-83d2-4857-8b02-b933c480c1a9
SERVICES=messages users

for NAME in messages users
do
  FILENAME=$NAME.db
  echo Copying $NAME to $FILENAME
  http $FROM_HOST/db-dump/$NAME \
    dumb-db-secret:$TOKEN > $FILENAME
  http -f POST $TO_HOST/db-set \
    dumb-db-secret:$TOKEN \
    service=$NAME \
    db=@$FILENAME
done

