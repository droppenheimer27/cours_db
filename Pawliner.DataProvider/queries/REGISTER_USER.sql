USE [Pawliner];

CREATE PROCEDURE [dbo].[REGISTER_USER]
	@id AS NVARCHAR(MAX),
	@userName AS NVARCHAR(MAX),
	@passHash AS NVARCHAR(MAX)
AS
BEGIN
	INSERT INTO [dbo].[AspNetUsers]
           ([Id]
           ,[FullName]
           ,[Skype]
           ,[Email]
           ,[EmailConfirmed]
           ,[PasswordHash]
           ,[SecurityStamp]
           ,[PhoneNumber]
           ,[PhoneNumberConfirmed]
           ,[TwoFactorEnabled]
           ,[LockoutEndDateUtc]
           ,[LockoutEnabled]
           ,[AccessFailedCount]
           ,[UserName]
           ,[PhotoId])
     VALUES
           (@id
           ,NULL
           ,NULL
           ,NULL
           ,1
           ,@passHash
           ,NULL
           ,NULL
           ,0
           ,0
           ,NULL
           ,0
           ,0
           ,@userName
           ,NULL)
END;

DROP PROCEDURE [REGISTER_USER];

EXECUTE [REGISTER_USER] '1234', 'USER3000', '3000';