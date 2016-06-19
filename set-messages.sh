# execute POST request and replace the messages DB
http -f POST localhost:3030/db-set \
  dumb-db-secret:ebd2d309-83d2-4857-8b02-b933c480c1a9 \
  service=messages \
  db=@./new-messages.db
