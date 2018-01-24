CREATE DATABASE IF NOT EXISTS RIDER;
USE RIDER;

DROP TABLE IF EXISTS `triprequestdtls`;
CREATE TABLE IF NOT EXISTS `triprequestdtls` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `RiderId` varchar(36) NOT NULL,
  `RiderMsg` varchar(500) DEFAULT NULL,
  `DriverId` varchar(36) DEFAULT NULL,
  `EstTravelCost` bigint(20) DEFAULT NULL,
  `Remarks` varchar(500) DEFAULT NULL,
  `Status` varchar(20) NOT NULL,
  `IsActive` bit(1) DEFAULT b'1',
  `RequestDate` varchar(50) DEFAULT NULL,
  `Approvedate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS RiderRegDtls;
CREATE TABLE RiderRegDtls(
	ID INT(10) NOT NULL AUTO_INCREMENT,
	RiderName varchar(50) NOT NULL,
	Age bigint DEFAULT NULL,
	Gender varchar(5) NOT NULL,
	MobileNo varchar(10) DEFAULT NULL,
	StateId varchar(10) DEFAULT NULL,
	CityId varchar(36) DEFAULT NULL,
	Location varchar(50) DEFAULT NULL,
	Address varchar(200) DEFAULT NULL,
	Remarks varchar(500) DEFAULT NULL,
	IsActive bit NOT NULL,
	CreatedBy varchar(50) NOT NULL,
	CreatedDate varchar(50) NOT NULL,
	ModifiedBy varchar(50) DEFAULT NULL,
	ModifiedDate varchar(50) DEFAULT NULL,
	PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS DriverRegDtls;
CREATE TABLE DriverRegDtls(
	ID INT(10) NOT NULL AUTO_INCREMENT,
	DriverName varchar(50) NOT NULL,
	Age bigint  DEFAULT NULL,
	Gender varchar(5) NOT NULL,
	MobileNo varchar(10) DEFAULT NULL,
	VehicleNo varchar(10) DEFAULT NULL,
	StateId varchar(10) DEFAULT NULL,
	CityId varchar(36) DEFAULT NULL,
	Location varchar(50) DEFAULT NULL,
	Address varchar(200) DEFAULT NULL,
	Remarks varchar(500) DEFAULT NULL,
	IsActive bit NOT NULL,
	CreatedBy varchar(50) NOT NULL,
	CreatedDate varchar(50) NOT NULL,
	ModifiedBy varchar(50) DEFAULT NULL,
	ModifiedDate varchar(50) DEFAULT NULL,
	PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS UserLogin;
CREATE TABLE UserLogin(
	ID int(10) NOT NULL AUTO_INCREMENT,
	UserID varchar(50) NOT NULL,
	UserName varchar(100) NOT NULL,
	Password varchar(50) NOT NULL,
	userType varchar(1) NOT NUll,
	PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
