USE [Pawliner];

CREATE PROCEDURE [dbo].[UPDATE_ORDER]
	@id AS INT,
	@header AS NVARCHAR(MAX),
	@description AS NVARCHAR(MAX),
	@city AS NVARCHAR(MAX),
	@address AS NVARCHAR(MAX),
	@price AS NVARCHAR(MAX),
	@name AS NVARCHAR(32),
	@phoneNumber AS NVARCHAR(MAX),
	@completedOn AS NVARCHAR(MAX),
	@serviceId AS INT
AS
BEGIN
	UPDATE [dbo].[Orders] SET [Header] = @header,
	[Description] = @description,
	[City] = @city,
	[Address] = @address,
	[Price] = @price,
	[Name] = @name,
	[PhoneNumber] = @phoneNumber,
	[CompletedOn] = @completedOn,
	[ServiceClassiferId] = @serviceId
	WHERE [Id] = @id;
END;

DROP PROCEDURE [dbo].[UPDATE_ORDER];

