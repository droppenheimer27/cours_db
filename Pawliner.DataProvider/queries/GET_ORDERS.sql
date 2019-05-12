USE [Pawliner];

DROP PROCEDURE GET_ORDERS;
DROP FUNCTION SEARCH_ORDERS;
DROP FUNCTION FILTER_ORDERS;
DROP TYPE ORDER_TABLE;

CREATE TYPE ORDER_TABLE AS TABLE
(
	Id INT PRIMARY KEY NOT NULL,
	Header NVARCHAR(128) NOT NULL,
	Address NVARCHAR(MAX),
	City NVARCHAR(MAX) NOT NULL,
	CompletedOn NVARCHAR(MAX) NOT NULL,
	Description NVARCHAR(MAX) NOT NULL,
	CreatedAt NVARCHAR(MAX),
	Name NVARCHAR(32) NOT NULL,
	PhoneNumber NVARCHAR(MAX) NOT NULL,
	Price NVARCHAR(MAX) NOT NULL,
	Status INT NOT NULL,
	FileName NVARCHAR(MAX),
	Path NVARCHAR(MAX),
	ServiceClassiferId INT NOT NULL,
	ServiceClassiferDescription NVARCHAR(128),
	UserId NVARCHAR(128)
); 

CREATE PROCEDURE GET_ORDERS
	@search AS NVARCHAR(128),
	@filter AS NVARCHAR(MAX)
AS
BEGIN
	DECLARE @table dbo.ORDER_TABLE;
	DECLARE @table2 dbo.ORDER_TABLE;
	DECLARE @table3 dbo.ORDER_TABLE;

	INSERT @table
		SELECT [Orders].Id,
			[Orders].Header,
			[Orders].Address,
			[Orders].City,
			[Orders].CompletedOn,
			[Orders].Description,
			[Orders].CreatedAt,
			[Orders].Name,
			[Orders].PhoneNumber,
			[Orders].Price,
			[Orders].Status,
			ISNULL([Photos].FileName, ''),
			ISNULL([Photos].Path, ''),
			[Orders].ServiceClassiferId,
			ISNULL([ServiceClassifers].Description, ''),
			[Orders].UserId
		FROM [Orders]
		LEFT JOIN [Photos] ON [Photos].Id = 
		(SELECT TOP 1 [OrderPhotoes].Photo_Id 
		FROM [OrderPhotoes]
		WHERE [Orders].Id = [OrderPhotoes].Order_Id)
		INNER JOIN [ServiceClassifers] ON [ServiceClassifers].Id = [Orders].ServiceClassiferId
		ORDER BY [Orders].Id DESC

	INSERT @table2 SELECT * FROM SEARCH_ORDERS(@table, @search);
	IF LEN(@filter) = 0
		BEGIN
			SELECT * FROM @table2
			ORDER BY Id DESC;
		END;
	ELSE
		BEGIN
			INSERT @table3 SELECT * FROM FILTER_ORDERS(@table2, @filter);
			SELECT * FROM @table3
			ORDER BY Id DESC;
		END;
END;

CREATE FUNCTION SEARCH_ORDERS(@table AS dbo.ORDER_TABLE READONLY, @search AS NVARCHAR(128)) 
RETURNS TABLE AS 
RETURN 
	SELECT *
	FROM @table
	WHERE [Header] LIKE '%' + @search + '%';

CREATE FUNCTION FILTER_ORDERS(@table AS dbo.ORDER_TABLE READONLY, @filter AS NVARCHAR(MAX)) 
RETURNS TABLE AS 
RETURN 
	SELECT Id,
		Header,
		Address,
		City,
		CompletedOn,
		Description,
		CreatedAt,
		Name,
		PhoneNumber,
		Price,
		Status,
		FileName,
		Path,
		ServiceClassiferId,
		ServiceClassiferDescription,
		UserId 
	FROM @table
	INNER JOIN SERVICES_TO_TABLE(@filter, DEFAULT) AS [Services] ON [ServiceClassiferId] = [Services].str

CREATE FUNCTION SERVICES_TO_TABLE
                    (@list      ntext,
                     @delimiter nchar(1) = N',')
         RETURNS @tbl TABLE (str varchar(4000)) AS

   BEGIN
      DECLARE @pos      int,
              @textpos  int,
              @chunklen smallint,
              @tmpstr   nvarchar(4000),
              @leftover nvarchar(4000),
              @tmpval   nvarchar(4000)

      SET @textpos = 1
      SET @leftover = ''
      WHILE @textpos <= datalength(@list) / 2
      BEGIN
         SET @chunklen = 4000 - datalength(@leftover) / 2
         SET @tmpstr = @leftover + substring(@list, @textpos, @chunklen)
         SET @textpos = @textpos + @chunklen

         SET @pos = charindex(@delimiter, @tmpstr)

         WHILE @pos > 0
         BEGIN
            SET @tmpval = ltrim(rtrim(left(@tmpstr, charindex(@delimiter, @tmpstr) - 1)))
            INSERT @tbl (str) VALUES(@tmpval)
            SET @tmpstr = substring(@tmpstr, @pos + 1, len(@tmpstr))
            SET @pos = charindex(@delimiter, @tmpstr)
         END

         SET @leftover = @tmpstr
      END

      INSERT @tbl(str) VALUES (ltrim(rtrim(@leftover)))
   RETURN
   END

DECLARE @table dbo.ORDER_TABLE;

INSERT @table
	SELECT [Orders].Id,
		[Orders].Header,
		[Orders].Address,
		[Orders].City,
		[Orders].CompletedOn,
		[Orders].Description,
		[Orders].CreatedAt,
		[Orders].Name,
		[Orders].PhoneNumber,
		[Orders].Price,
		[Orders].Status,
		[Photos].FileName,
		[Photos].Path,
		[Orders].ServiceClassiferId,
		[Orders].UserId
	FROM [Orders]
	LEFT JOIN [Photos] ON [Photos].Id = 
	(SELECT TOP 1 [OrderPhotoes].Photo_Id 
	FROM [OrderPhotoes]
	WHERE [Orders].Id = [OrderPhotoes].Order_Id)

SELECT * FROM FILTER_ORDERS(@table, '1')
SELECT * FROM SERVICES_TO_TABLE('3, 2, 6, 4', DEFAULT)

EXECUTE GET_ORDERS '', ''