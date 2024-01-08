
ALTER TABLE Crime_Data_from_2020_to_Present 
DROP COLUMN "Cross Street",
DROP COLUMN "Status",
DROP COLUMN "Status Desc",
DROP COLUMN "Part 1-2",
DROP COLUMN "area";

ALTER TABLE Crime_Data_from_2020_to_Present 
DROP COLUMN "Date Rptd",
DROP COLUMN "mocodes",
DROP COLUMN "Premis Cd",
DROP COLUMN "Weapon Used Cd";

ALTER TABLE Crime_Data_from_2020_to_Present 
DROP COLUMN "Rpt Dist No";

SELECT * FROM Crime_Data_from_2020_to_Present;