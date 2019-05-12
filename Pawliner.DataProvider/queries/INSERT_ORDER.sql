USE [Pawliner]

CREATE PROCEDURE [dbo].[INSERT_ORDER]
	@header AS NVARCHAR(MAX),
	@description AS NVARCHAR(MAX),
	@city AS NVARCHAR(MAX),
	@address AS NVARCHAR(MAX),
	@price AS NVARCHAR(MAX),
	@name AS NVARCHAR(32),
	@phoneNumber AS NVARCHAR(MAX),
	@completedOn AS NVARCHAR(MAX),
	@userId AS NVARCHAR(128),
	@serviceId AS INT
AS
BEGIN
	INSERT INTO [dbo].[Orders]
			   ([Header]
			   ,[Description]
			   ,[City]
			   ,[Address]
			   ,[Price]
			   ,[Name]
			   ,[PhoneNumber]
			   ,[CompletedOn]
			   ,[CreatedAt]
			   ,[UpdatedAt]
			   ,[UserId]
			   ,[Status]
			   ,[ServiceClassiferId])
		 VALUES
			   (@header
			   ,@description
			   ,@city
			   ,@address
			   ,@price
			   ,@name
			   ,ISNULL(@phoneNumber, '')
			   ,@completedOn
			   ,CONVERT(NVARCHAR, GETDATE(), 11)
			   ,CONVERT(NVARCHAR, GETDATE(), 11)
			   ,@userId
			   ,0
			   ,@serviceId)
END;

DROP PROCEDURE [INSERT_ORDER];