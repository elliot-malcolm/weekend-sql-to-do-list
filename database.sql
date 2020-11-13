CREATE TABLE "to_do" (
"id" SERIAL PRIMARY KEY,
"list_item" VARCHAR(300) NOT NULL,
"yesComplete" BOOLEAN DEFAULT FALSE, 
)

INSERT INTO "to_do" ("list_item")
VALUES
('organize my socks', 'feed the butterflies', 'water a plant');