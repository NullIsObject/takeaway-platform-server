/*
 Navicat Premium Data Transfer

 Source Server         : user1
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3306
 Source Schema         : takeaway_platform

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 29/12/2022 21:12:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for discounts
-- ----------------------------
DROP TABLE IF EXISTS `discounts`;
CREATE TABLE `discounts`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '优惠券名',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '信息',
  `indate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '有效期，时间戳（mm）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of discounts
-- ----------------------------
INSERT INTO `discounts` VALUES ('00001', '01', '01', '01');
INSERT INTO `discounts` VALUES ('00002', '02', '02', '02');

-- ----------------------------
-- Table structure for order_details
-- ----------------------------
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details`  (
  `order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `commodity_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '商品名',
  `commodity_price` float NOT NULL COMMENT '商品价格',
  `commodity_number` int NOT NULL COMMENT '商品数量'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_details
-- ----------------------------

-- ----------------------------
-- Table structure for order_list
-- ----------------------------
DROP TABLE IF EXISTS `order_list`;
CREATE TABLE `order_list`  (
  `order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单id',
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户id',
  `shop_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '店铺id',
  `order_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单状态',
  `product_count_number` int NOT NULL COMMENT '商品数量',
  `product_count_price` float NOT NULL COMMENT '商品总价',
  `actual_payment` float NULL DEFAULT NULL COMMENT '实际付款金额',
  `freight_charge` float NOT NULL COMMENT '运费',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '收货地址',
  `create_time` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '订单创建时间戳',
  `payment_time` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '付款时间'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order_list
-- ----------------------------
INSERT INTO `order_list` VALUES ('00001', '20441', '00001', '已完成', 5, 100, 110, 10, '北京;朝阳;人民广场1号', '1667608493115', '1667608493115');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `id` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_time` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '单位：ms',
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `update_time` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '单位：ms',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户姓名',
  `sex` char(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户所在城市',
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_name`(`user_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('00002', '1666105512', 'user', 'user', '1666105512', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('00693', '1667608493115', 'cghjc', '732f2b2f2fb76f3061b246612752b26d', '1667608493115', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('03133', '1669044722655', 'arf', 'e61f9b9d4509393e62949a17ca1ab330', '1669044722655', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('10696', '1666796577163', 'AA', '3b110e2882d4245eedbf60f29501af08', '1666796577163', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('11568', '1666799362969', 'AbsadfgfsA', '9059550d5b1d1a84ba7ed3bbe107c1d8', '1666799362969', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('19743', '1667019356316', 'Afdf1', '162cdc848c8546e6fe8bb40818a6b299', '1667019356316', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('20441', '1667743347902', 'root', 'b4b8daf4b8ea9d39568719e1e320076f', '1667743347902', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('23145', '1667227105203', 'ccsdfsdfc', '326efde9bf3772d7e0cde6c8c2bb49cc', '1667227105203', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('26172', '1667227326974', 'ccjhgjghdfc', '1617e4be3f69424d27aa9aca0561e473', '1667227326974', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('30106', '1666797611249', 'AbsasdfsA', '27b7df9dfb1a63512a35e2d51706617a', '1666797611249', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('31299', '1667227677960', 'ccjhgytythdfc', '0ebfcfdbd5cc11835f3f8fd448b4b417', '1667227677960', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('31418', '1666592773035', 'A1', '210baf77327d6522fe7fe95f2d58afdd', '1666592773035', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('33633', '1666776023008', 'AAAAAAAAA', '9fe125b6680b43a62953d4cc6f4e08bf', '1666776023008', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('34169', '1667661760630', 'cgdsfc', '350b71b74f24e480f0dc6c48821c0747', '1667661760630', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('47917', '1666797152651', 'AbbssA', '5a13700664c90a0dabc7f89d360da176', '1666797152651', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('51274', '1666796592487', 'AsssA', 'd2024d49cfda325f1ba7f56c413ca752', '1666796592487', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('53424', '1667231311752', 'cctythdfc', '9d2269c1795fc30a5d0eb83f43cede2a', '1667231311752', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('56103', '1667235841639', 'cchdfc', '33c82244bbf356593f79ec7bfe7b004a', '1667235841639', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('62205', '1666689297281', 'A2', '5cf12fba3c404ed6b5ea942e20ae27cf', '1666689297281', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('68585', '1669044261123', 'asdfasdfsdf', '6ef896140d2765aff4122ee7d94b0093', '1669044261123', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('81048', '1667047736562', 'cccccc', '04f396ea90ac5f8578f8537dae595b95', '1667047736562', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('88710', '1669044282813', 'asdfasdfdsdf', 'da788530dd959a492e18c6afb66f9ee0', '1669044282813', NULL, NULL, NULL, NULL);
INSERT INTO `user_info` VALUES ('89528', '1666797567720', 'AbsA', 'a529343ac8238df8fb34249f6f964b8d', '1666797567720', NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user_wallet
-- ----------------------------
DROP TABLE IF EXISTS `user_wallet`;
CREATE TABLE `user_wallet`  (
  `id` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `money` bigint NULL DEFAULT NULL COMMENT '用户余额',
  `score` bigint NULL DEFAULT NULL COMMENT '用户积分',
  `discounts` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '优惠券列表，传入优惠券id,\';\'分隔',
  INDEX `id`(`id`) USING BTREE,
  CONSTRAINT `user_wallet_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user_info` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_wallet
-- ----------------------------
INSERT INTO `user_wallet` VALUES ('00002', 2, 2, '00001;00002');
INSERT INTO `user_wallet` VALUES ('62205', 3, 3, '00001;00002');
INSERT INTO `user_wallet` VALUES ('20441', 3, 2, '00001;00002');

SET FOREIGN_KEY_CHECKS = 1;
