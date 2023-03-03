# sacs admin    
sacs admin page


# DB Configuration
-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.30 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.1.0.6541
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- sacsdb 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `sacsdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sacsdb`;

-- 테이블 sacsdb.ap 구조 내보내기
CREATE TABLE IF NOT EXISTS `ap` (
  `apnum` int NOT NULL DEFAULT '0',
  `mac` varchar(80) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `swv` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `idate` varchar(50) DEFAULT NULL,
  `location` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `admn` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`apnum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sacsdb.ap:~1 rows (대략적) 내보내기
INSERT IGNORE INTO `ap` (`apnum`, `mac`, `ip`, `swv`, `idate`, `location`, `admn`) VALUES
	(20221128, '00:1A:C2:7B:00:47', '202.31.90.8', 'V1.19', '2022.12.28', '8층 메인게이트', '김지형');

-- 테이블 sacsdb.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `userID` int NOT NULL DEFAULT '0',
  `userName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phoneNum` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `crypto` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dept` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 sacsdb.user:~11 rows (대략적) 내보내기
INSERT IGNORE INTO `user` (`userID`, `userName`, `phoneNum`, `crypto`, `dept`) VALUES
	(1012345, '서성희', '010-6785-0987', '2cc13b89d943cfa4f77ff4a872749ff0b011e4a1', '개발2팀'),
	(1087546, '김상호', '010-3845-8945', '1ceaa911d4d4e3c255f9c065c2842871fd3778af', '시설팀'),
	(1107654, '서용호', '010-5876-9876', 'cdc53783b8055adf5ac1d4aab940193c89c0d8e1', '시설팀'),
	(1109876, '최진영', '010-6785-0987', '2cc13b89d943cfa4f77ff4a872749ff0b011e4a1', '회계팀'),
	(1178654, '나균안', '010-5678-0987', '2e5e349d18976827d1b8f468c844ec2385cced1b', '법무팀'),
	(2184726, '박구현', '010-4257-1331', 'ef63df2ae2a664fe74340b18e857090454241682', '기획실'),
	(3143237, '박성철', '010-8559-7644', '809e5f858e1cdbc81284e94bb012ed80848830b3', '기획팀'),
	(3490856, '김정웅', '010-2378-0987', '283df938cd232200f88a7717a36937ab9f1dba08', '총무팀'),
	(4174642, '박승용', '010-5674-9098', '160cf28cf37d3cc98cff07dd04cf24d964c4dde9', '연구소'),
	(5148788, '임성호', '010-3713-5644', '160cf28cf37d3cc98cff07dd04cf24d964c4dde9', '사장실'),
	(5176849, '김재승', '010-2356-3242', 'fc8654500ecf186c0b3536a572dbaaa21f228518', '시설팀'),
	(6138489, '구기우', '010-6269-0619', 'd8616ead37fba67f70ea9890a474ff050373845a', '운영팀'),
	(9000000, '방문자', '\\N', NULL, '\\N');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
