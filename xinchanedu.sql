/*
 Navicat Premium Data Transfer

 Source Server         : 47.92.34.231
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : 47.92.34.231:3306
 Source Schema         : xinchanedu

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 08/10/2022 16:31:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一ID',
  `schoolId` int NOT NULL COMMENT '所属教育机构ID',
  `courseId` int NOT NULL COMMENT '所属课程ID',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '班级表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of classes
-- ----------------------------
INSERT INTO `classes` VALUES (1, 1, 1, 'Web01', '2022-10-08 07:46:41', '2022-10-08 07:46:41');

-- ----------------------------
-- Table structure for classes_users
-- ----------------------------
DROP TABLE IF EXISTS `classes_users`;
CREATE TABLE `classes_users`  (
  `classId` int UNSIGNED NOT NULL COMMENT '班级ID',
  `userId` int NOT NULL COMMENT '教师或学生ID',
  `isTeacher` bit(1) NOT NULL COMMENT '是否教师（冗余字段，用于提高查询速度）',
  PRIMARY KEY (`classId`, `userId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '班级_用户_关系表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of classes_users
-- ----------------------------
INSERT INTO `classes_users` VALUES (1, 2, b'0');
INSERT INTO `classes_users` VALUES (1, 3, b'1');
INSERT INTO `classes_users` VALUES (1, 4, b'1');
INSERT INTO `classes_users` VALUES (1, 5, b'0');
INSERT INTO `classes_users` VALUES (1, 6, b'0');
INSERT INTO `classes_users` VALUES (1, 7, b'0');
INSERT INTO `classes_users` VALUES (1, 8, b'0');
INSERT INTO `classes_users` VALUES (1, 9, b'0');
INSERT INTO `classes_users` VALUES (1, 10, b'0');
INSERT INTO `classes_users` VALUES (1, 11, b'0');
INSERT INTO `classes_users` VALUES (1, 12, b'0');

-- ----------------------------
-- Table structure for classtimes
-- ----------------------------
DROP TABLE IF EXISTS `classtimes`;
CREATE TABLE `classtimes`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一ID',
  `schoolId` int NOT NULL COMMENT '所属教育机构ID',
  `courseId` int NOT NULL COMMENT '所属课程ID',
  `contentId` int NOT NULL COMMENT '所属课程内容ID',
  `classId` int NOT NULL COMMENT '所属班级ID',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `coursewareFiles` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '课件文件列表（UUID用竖线|分隔）',
  `homeworkFiles` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '作业文件列表（UUID用竖线|分隔）',
  `startTime` timestamp NOT NULL COMMENT '开始时间',
  `endTime` timestamp NOT NULL COMMENT '结束时间',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '课时表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of classtimes
-- ----------------------------
INSERT INTO `classtimes` VALUES (1, 1, 1, 0, 1, '走进HTML', '', '', '2022-10-10 08:30:00', '2022-10-10 12:30:00', '2022-10-08 08:30:26', '2022-10-08 08:33:17');

-- ----------------------------
-- Table structure for contents
-- ----------------------------
DROP TABLE IF EXISTS `contents`;
CREATE TABLE `contents`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一ID',
  `schoolId` int NOT NULL COMMENT '所属教育机构ID',
  `courseId` int NOT NULL COMMENT '所属课程ID',
  `subjectId` int NOT NULL COMMENT '所属科目ID',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `duration` int NOT NULL COMMENT '时长（以分钟计）',
  `coursewareFiles` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '课件文件列表（UUID用竖线|分隔）',
  `homeworkFiles` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '作业文件列表（UUID用竖线|分隔）',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '课程内容表（课程内容是课次的模板）' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of contents
-- ----------------------------
INSERT INTO `contents` VALUES (1, 1, 1, 1, '走进HTML', 0, '', NULL, '2022-10-08 07:29:30', '2022-10-08 07:44:06');

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一ID',
  `schoolId` int NOT NULL COMMENT '所属教育机构ID',
  `name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '课程表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of courses
-- ----------------------------
INSERT INTO `courses` VALUES (1, 1, '前端开发', '2022-10-08 00:34:20', '2022-10-08 00:34:20');

-- ----------------------------
-- Table structure for homeworks
-- ----------------------------
DROP TABLE IF EXISTS `homeworks`;
CREATE TABLE `homeworks`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一ID',
  `schoolId` int NOT NULL COMMENT '所属教育机构ID',
  `courseId` int NOT NULL COMMENT '所属课程ID',
  `classId` int NOT NULL COMMENT '所属班级ID',
  `classtimeId` int NOT NULL COMMENT '所属课次ID',
  `files` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '' COMMENT '提交作业文件列表（UUID用竖线|分隔）',
  `remark` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '学生备注',
  `review` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '教师评语',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '作业表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of homeworks
-- ----------------------------

-- ----------------------------
-- Table structure for punchtimes
-- ----------------------------
DROP TABLE IF EXISTS `punchtimes`;
CREATE TABLE `punchtimes`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一ID',
  `schoolId` int NOT NULL COMMENT '所属教育机构ID',
  `userId` int NOT NULL COMMENT '打卡者用户ID',
  `isLeaving` bit(1) NOT NULL COMMENT '是否离校卡',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '打卡表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of punchtimes
-- ----------------------------

-- ----------------------------
-- Table structure for schools
-- ----------------------------
DROP TABLE IF EXISTS `schools`;
CREATE TABLE `schools`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一ID',
  `creatorId` int NOT NULL COMMENT '创建者ID',
  `status` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态（审核中/正常/屏蔽）',
  `name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '名称',
  `legalPerson` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '法定代表人',
  `legalPersonIdentityNo` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '法定代表人身份证号',
  `businessLicense` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '营业执照',
  `businessLicensePhoto` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '营业执照照片',
  `applicantId` int NOT NULL COMMENT '申请人ID',
  `applicantName` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请人姓名',
  `applicantIdentityNo` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请人身份证号',
  `applicantIdentityCardFrontsidePhoto` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请人身份证正面照片',
  `applicantIdentityCardBacksidePhoto` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '申请人身份证背面照片',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '教育机构表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of schools
-- ----------------------------
INSERT INTO `schools` VALUES (1, 2, '正常', '惠州市信产科技有限公司', '唐阳', '', '91441302MA56DWYR72', '', 0, '', '', '', '', '2022-10-08 00:33:08', '2022-10-08 00:33:08');

-- ----------------------------
-- Table structure for subjects
-- ----------------------------
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一ID',
  `schoolId` int NOT NULL COMMENT '所属教育机构ID',
  `courseId` int NOT NULL COMMENT '所属课程ID',
  `title` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '标题',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '科目表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of subjects
-- ----------------------------
INSERT INTO `subjects` VALUES (1, 1, 1, 'HTML+CSS', '2022-10-08 07:41:14', '2022-10-08 07:41:36');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '唯一ID',
  `schoolId` int NULL DEFAULT NULL COMMENT '所属教育机构ID',
  `status` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '状态（审核中/正常/屏蔽）',
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '登录用户名',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'MD5加密登录密码',
  `role` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '身份（平台管理员/管理员/教师/学生）',
  `roleType` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '身份类型（platform-admin/admin/teacher/student）',
  `name` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '姓名',
  `gender` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '性别（男/女）',
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机号',
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'Email地址',
  `createTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username_unique`(`username` ASC) USING BTREE COMMENT '用户名唯一',
  INDEX `username_password`(`username` ASC, `password` ASC) USING BTREE COMMENT '主要用户用户登录查询'
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 0, '正常', 'pa', '111', '平台管理员', 'platform-admin', '平台管理员', '男', NULL, NULL, '2022-10-08 00:10:45', '2022-10-08 00:15:10');
INSERT INTO `users` VALUES (2, 1, '正常', 'wangyanmei', '111', '管理员', 'admin', '王艳梅', '女', NULL, NULL, '2022-10-08 00:14:51', '2022-10-08 00:16:56');
INSERT INTO `users` VALUES (3, 1, '正常', 'zhangguobin', '111', '教师', 'teacher', '张国斌', '男', '13760314370', 'zhangguobin@kawaedu.com', '2022-10-08 00:16:33', '2022-10-08 00:16:33');
INSERT INTO `users` VALUES (4, 1, '正常', 'chenrongqiang', '111', '教师', 'teacher', '陈荣强', '男', NULL, NULL, '2022-10-08 00:19:10', '2022-10-08 00:19:10');
INSERT INTO `users` VALUES (5, 1, '正常', 'chenhuchuan', '111', '学生', 'student', '陈湖川', '男', NULL, NULL, '2022-10-08 00:20:00', '2022-10-08 00:20:00');
INSERT INTO `users` VALUES (6, 1, '正常', 'qianzhengli', '111', '学生', 'student', '钱正力', '男', NULL, NULL, '2022-10-08 00:20:51', '2022-10-08 00:20:51');
INSERT INTO `users` VALUES (7, 1, '正常', 'luohaitang', '111', '学生', 'student', '罗海堂', '男', NULL, NULL, '2022-10-08 00:22:06', '2022-10-08 00:22:06');
INSERT INTO `users` VALUES (8, 1, '正常', 'huangliang', '111', '学生', 'student', '黄亮', '男', NULL, NULL, '2022-10-08 00:22:38', '2022-10-08 00:22:38');
INSERT INTO `users` VALUES (9, 1, '正常', 'zhangquanlei', '111', '学生', 'student', '张全磊', '男', NULL, NULL, '2022-10-08 00:23:16', '2022-10-08 00:23:16');
INSERT INTO `users` VALUES (10, 1, '正常', 'fuzhishen', '111', '学生', 'student', '付志绅', '男', NULL, NULL, '2022-10-08 00:24:04', '2022-10-08 00:24:04');
INSERT INTO `users` VALUES (11, 1, '正常', 'jiangruilin', '111', '学生', 'student', '江瑞林', '男', NULL, NULL, '2022-10-08 00:24:40', '2022-10-08 00:24:40');
INSERT INTO `users` VALUES (12, 1, '正常', 'wangcheng', '111', '学生', 'student', '王城', '男', NULL, NULL, '2022-10-08 00:25:05', '2022-10-08 00:25:05');

SET FOREIGN_KEY_CHECKS = 1;
