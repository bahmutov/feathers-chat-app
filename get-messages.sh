# grabs the given service database
HOST=localhost:3030
NAME=messages
TOKEN=ebd2d309-83d2-4857-8b02-b933c480c1a9
http $HOST/db-dump/$NAME \
  dumb-db-secret:$TOKEN > $NAME.db
