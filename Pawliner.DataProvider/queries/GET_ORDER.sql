USE [Pawliner];

CREATE PROCEDURE [dbo].[GET_ORDER]
	@id AS INT
AS
BEGIN
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
			[Orders].ServiceClassiferId,
			[ServiceClassifers].Description AS ServiceClassiferDescription,
			[Orders].UserId,
			'' AS FileName,
			'' AS Path
		FROM [Orders]
		INNER JOIN [ServiceClassifers] ON [ServiceClassifers].Id = [Orders].ServiceClassiferId
		WHERE [Orders].Id = @id;
END;

DROP PROCEDURE GET_ORDER;

EXECUTE GET_ORDER 8;