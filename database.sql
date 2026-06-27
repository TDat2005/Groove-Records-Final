-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 21, 2026 lúc 06:19 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `clonevocrecord`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `baiviet`
--

CREATE TABLE `baiviet` (
  `MaBV` int(11) NOT NULL,
  `TieuDe` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `NoiDung` text NOT NULL,
  `LoaiBV` enum('blog','huongdan') DEFAULT 'blog',
  `HinhAnh` varchar(255) DEFAULT NULL,
  `MaTK` int(11) DEFAULT NULL,
  `TrangThai` enum('nhap','daxuatban') DEFAULT 'nhap',
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp(),
  `NgayCapNhat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `baiviet`
--

INSERT INTO `baiviet` (`MaBV`, `TieuDe`, `NoiDung`, `LoaiBV`, `HinhAnh`, `MaTK`, `TrangThai`, `NgayTao`, `NgayCapNhat`) VALUES
(1, 'Hã░ß╗øng dß║½n chß╗ìn ─æ─®a than cho ngã░ß╗Øi mß╗øi', 'Bß║ín mß╗øi bß║»t ─æß║ºu chãíi ─æ─®a than? ─É├óy l├á nhß╗»ng ─æiß╗üu cãí bß║ún bß║ín cß║ºn biß║┐t trã░ß╗øc khi mua chiß║┐c ─æ─®a ─æß║ºu ti├¬n. ─É─®a than (vinyl) l├á mß╗Öt phã░ãíng tiß╗çn lã░u trß╗» ├óm nhß║íc analog, ─æem lß║íi trß║úi nghiß╗çm nghe nhß║íc ß║Ñm ├íp v├á ch├ón thß╗▒c hãín so vß╗øi digital. Khi chß╗ìn ─æ─®a, bß║ín n├¬n ch├║ ├¢ ─æß║┐n t├¼nh trß║íng bß╗ü mß║Àt ─æ─®a, kiß╗âm tra xem c├│ bß╗ï xã░ß╗øc hay cong v├¬nh kh├┤ng. ─É─®a mß╗øi sealed thã░ß╗Øng c├│ chß║Ñt lã░ß╗úng tß╗æt nhß║Ñt, nhã░ng ─æ─®a vintage c┼®ng c├│ gi├í trß╗ï ri├¬ng nß║┐u ─æã░ß╗úc bß║úo quß║ún tß╗æt.', 'huongdan', NULL, NULL, 'daxuatban', '2026-04-07 14:56:41', '2026-04-07 14:56:41'),
(2, 'Top 10 album vinyl ─æ├íng sã░u tß║ºm 2026', 'N─âm 2026 chß╗®ng kiß║┐n sß╗▒ trß╗ƒ lß║íi mß║ính mß║¢ cß╗ºa vinyl vß╗øi nhiß╗üu album xuß║Ñt sß║»c. Tß╗½ c├íc bß║ún t├íi bß║ún kinh ─æiß╗ân ─æß║┐n nhß╗»ng album mß╗øi ─æã░ß╗úc ph├ít h├ánh ─æß╗Öc quyß╗ün tr├¬n ─æ─®a than, ─æ├óy l├á danh s├ích 10 album kh├┤ng thß╗â bß╗Å qua cho bß╗Ö sã░u tß║¡p cß╗ºa bß║ín.', 'blog', NULL, NULL, 'daxuatban', '2026-04-07 14:56:41', '2026-04-07 14:56:41'),
(3, 'C├ích bß║úo quß║ún ─æ─®a than ─æ├║ng c├ích', '─É─®a than cß║ºn ─æã░ß╗úc bß║úo quß║ún cß║®n thß║¡n ─æß╗â giß╗» chß║Ñt lã░ß╗úng ├óm thanh. Lu├┤n cß║Ñt ─æ─®a trong bao b├¼ chß╗æng t─®nh ─æiß╗çn, ─æß╗â ─æß╗®ng thay v├¼ xß║┐p chß╗ông, v├á tr├ính ├ính nß║»ng trß╗▒c tiß║┐p. Vß╗ç sinh ─æ─®a thã░ß╗Øng xuy├¬n bß║▒ng b├án chß║úi carbon fiber trã░ß╗øc mß╗ùi lß║ºn nghe.', 'huongdan', NULL, NULL, 'daxuatban', '2026-04-07 14:56:41', '2026-04-07 14:56:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietdonhang`
--

CREATE TABLE `chitietdonhang` (
  `MaCTDH` int(11) NOT NULL,
  `MaDH` int(11) DEFAULT NULL,
  `MaSP` int(11) DEFAULT NULL,
  `SoLuong` int(11) NOT NULL,
  `DonGia` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `chitietdonhang`
--

INSERT INTO `chitietdonhang` (`MaCTDH`, `MaDH`, `MaSP`, `SoLuong`, `DonGia`) VALUES
(1, 1, 1, 1, 36000.00),
(2, 2, 2, 1, 850000.00),
(3, 3, 7, 1, 1500000.00),
(8, 8, 54, 1, 1100000.00),
(9, 9, 36, 2, 950000.00),
(10, 10, 54, 1, 1100000.00),
(11, 11, 68, 1, 5000.00),
(12, 12, 68, 1, 5000.00),
(13, 13, 68, 1, 5000.00),
(14, 14, 68, 1, 5000.00),
(15, 15, 36, 1, 950000.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietgiohang`
--

CREATE TABLE `chitietgiohang` (
  `MaCTGH` int(11) NOT NULL,
  `MaGH` int(11) DEFAULT NULL,
  `MaSP` int(11) DEFAULT NULL,
  `SoLuong` int(11) NOT NULL,
  `DonGia` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chitietphieunhap`
--

CREATE TABLE `chitietphieunhap` (
  `MaCTPN` int(11) NOT NULL,
  `MaPN` int(11) DEFAULT NULL,
  `MaSP` int(11) DEFAULT NULL,
  `SoLuongNhap` int(11) NOT NULL,
  `GiaNhap` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danhmuc`
--

CREATE TABLE `danhmuc` (
  `MaDM` int(11) NOT NULL,
  `TenDM` varchar(100) NOT NULL,
  `MoTa` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `danhmuc`
--

INSERT INTO `danhmuc` (`MaDM`, `TenDM`, `MoTa`) VALUES
(1, 'Đĩa Than (Vinyl)', 'Các đĩa thanh truyền thống'),
(2, 'Cassette', 'Băng Cassette gốc'),
(3, 'Máy Quay Đĩa (Turntable)', 'Mâm đĩa chất lượng cao'),
(4, 'Phụ Kiện', 'Bao da, thiết bị bảo dưỡng âm thanh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `donhang`
--

CREATE TABLE `donhang` (
  `MaDH` int(11) NOT NULL,
  `MaKH` int(11) DEFAULT NULL,
  `NguoiNhan` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SDTNhan` varchar(15) DEFAULT NULL,
  `NgayDat` timestamp NOT NULL DEFAULT current_timestamp(),
  `TongTien` decimal(15,2) NOT NULL,
  `TrangThai` enum('choxacnhan','daxacnhan','dangchuanbihang','danggiaohang','hoanthanh','dahuy') DEFAULT 'choxacnhan',
  `PhuongThucThanhToan` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'COD',
  `DiaChiGiao` text DEFAULT NULL,
  `GhiChu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `MaNVXuLy` int(11) DEFAULT NULL,
  `CodeGiamGia` varchar(50) DEFAULT NULL,
  `SoTienGiam` decimal(15,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `donhang`
--

INSERT INTO `donhang` (`MaDH`, `MaKH`, `NguoiNhan`, `SDTNhan`, `NgayDat`, `TongTien`, `TrangThai`, `PhuongThucThanhToan`, `DiaChiGiao`, `GhiChu`, `MaNVXuLy`, `CodeGiamGia`, `SoTienGiam`) VALUES
(1, 2, 'Khách Hàng Vip', '0766255478', '2026-04-07 15:07:06', 36000.00, 'daxacnhan', 'payos', 'Ngõ 57 Láng Hạ- Ba Đình\nsdf', '', NULL, NULL, 0.00),
(2, 2, 'Khách Hàng Vip', '0766255478', '2026-04-07 15:48:54', 850000.00, 'hoanthanh', 'cod', 'Ngõ 57 Láng Hạ- Ba Đình\nsdf', '', NULL, NULL, 0.00),
(3, 2, 'Khách Hàng Vip', '0766255478', '2026-04-08 04:45:28', 1500000.00, 'choxacnhan', 'payos', 'Ngõ 57 Láng Hạ- Ba Đình\nsdf', '', NULL, NULL, 0.00),
(8, 2, 'Khách Hàng Vip', '0766255478', '2026-04-08 05:01:44', 1100000.00, 'choxacnhan', 'payos', 'Ngõ 57 Láng Hạ- Ba Đình\n54 Trieu Khuc', '', NULL, NULL, 0.00),
(9, 2, 'Khách Hàng Vip', '0766255478', '2026-04-08 05:13:13', 1900000.00, 'choxacnhan', 'cod', 'Ngõ 57 Láng Hạ- Ba Đình\nsdf', '', NULL, NULL, 0.00),
(10, 2, 'Khách Hàng Vip', '0766255478', '2026-04-08 05:15:45', 1100000.00, 'choxacnhan', 'payos', 'Ngõ 57 Láng Hạ- Ba Đình\nsdf', '', NULL, NULL, 0.00),
(11, 2, 'Khách Hàng Vip', '0766255478', '2026-04-11 07:38:14', 5000.00, 'daxacnhan', 'payos', 'Ngõ 57 Láng Hạ- Ba Đình\nsdf', '', NULL, NULL, 0.00),
(12, 2, 'Khách Hàng Vip', '0766255478', '2026-04-12 17:52:26', 5000.00, 'choxacnhan', 'payos', 'Ngõ 57 Láng Hạ- Ba Đình\nsdf', '', NULL, NULL, 0.00),
(13, 2, 'Khách Hàng Vip', '0766255478', '2026-04-12 17:52:33', 5000.00, 'choxacnhan', 'payos', 'Ngõ 57 Láng Hạ- Ba Đình\nsdf', '', NULL, NULL, 0.00),
(14, 2, 'Khách Hàng Vip', '0766255478', '2026-04-21 11:41:38', 5000.00, 'daxacnhan', 'payos', 'Ngõ 57 Láng Hạ- Ba Đình\nsdf', '', NULL, NULL, 0.00),
(15, 2, '56', '76', '2026-04-21 11:43:09', 950000.00, 'choxacnhan', 'cod', '76', '', NULL, NULL, 0.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giohang`
--

CREATE TABLE `giohang` (
  `MaGH` int(11) NOT NULL,
  `MaKH` int(11) DEFAULT NULL,
  `TongTien` decimal(15,2) DEFAULT 0.00,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `khachhang`
--

CREATE TABLE `khachhang` (
  `MaKH` int(11) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `SoDienThoai` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DiaChi` text DEFAULT NULL,
  `MaTK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `khachhang`
--

INSERT INTO `khachhang` (`MaKH`, `HoTen`, `SoDienThoai`, `Email`, `DiaChi`, `MaTK`) VALUES
(2, 'Khách Hàng Vip', '09', 'khachhang@gmail.com', '', 6);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `magiamgia`
--

CREATE TABLE `magiamgia` (
  `MaGG` int(11) NOT NULL,
  `Code` varchar(50) NOT NULL,
  `LoaiGiamGia` enum('percent','fixed') NOT NULL DEFAULT 'percent',
  `GiaTri` decimal(15,2) NOT NULL,
  `DonHangToiThieu` decimal(15,2) DEFAULT 0.00,
  `SoLuong` int(11) DEFAULT 0,
  `DaDung` int(11) DEFAULT 0,
  `NgayHetHan` timestamp NULL DEFAULT NULL,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `magiamgia`
--

INSERT INTO `magiamgia` (`MaGG`, `Code`, `LoaiGiamGia`, `GiaTri`, `DonHangToiThieu`, `SoLuong`, `DaDung`, `NgayHetHan`, `NgayTao`) VALUES
(1, 'THUWTHUW', 'percent', 10.00, 200000.00, 20, 0, '2026-04-29 17:00:00', '2026-04-08 05:28:13');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhanvien`
--

CREATE TABLE `nhanvien` (
  `MaNV` int(11) NOT NULL,
  `HoTen` varchar(100) NOT NULL,
  `ChucVu` varchar(50) DEFAULT NULL,
  `MaTK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nhanvien`
--

INSERT INTO `nhanvien` (`MaNV`, `HoTen`, `ChucVu`, `MaTK`) VALUES
(2, 'Nhân Viên Test', NULL, 5);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nhatkyhoatdong`
--

CREATE TABLE `nhatkyhoatdong` (
  `MaNK` int(11) NOT NULL,
  `MaTK` int(11) DEFAULT NULL,
  `ThoiGian` timestamp NOT NULL DEFAULT current_timestamp(),
  `HanhDong` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `otpcodes`
--

CREATE TABLE `otpcodes` (
  `MaOTP` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `MaCode` varchar(6) NOT NULL,
  `LoaiOTP` enum('dangky','quenmatkhau','dangnhap') DEFAULT 'dangky',
  `HetHan` datetime NOT NULL,
  `DaSuDung` tinyint(1) DEFAULT 0,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `otpcodes`
--

INSERT INTO `otpcodes` (`MaOTP`, `Email`, `MaCode`, `LoaiOTP`, `HetHan`, `DaSuDung`, `NgayTao`) VALUES
(1, 'test@example.com', '652297', 'dangky', '2026-04-10 09:41:44', 0, '2026-04-10 07:36:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phieunhap`
--

CREATE TABLE `phieunhap` (
  `MaPN` int(11) NOT NULL,
  `MaNV` int(11) DEFAULT NULL,
  `NgayNhap` timestamp NOT NULL DEFAULT current_timestamp(),
  `TongTien` decimal(15,2) DEFAULT 0.00,
  `GhiChu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sanpham`
--

CREATE TABLE `sanpham` (
  `MaSP` int(11) NOT NULL,
  `TenSP` varchar(255) NOT NULL,
  `NgheSi` varchar(100) DEFAULT NULL,
  `TheLoai` varchar(100) DEFAULT NULL,
  `NamPhatHanh` int(11) DEFAULT NULL,
  `GiaBan` decimal(15,2) NOT NULL,
  `SoLuongTon` int(11) DEFAULT 0,
  `MoTa` text DEFAULT NULL,
  `HinhAnh` varchar(255) DEFAULT NULL,
  `TinhTrang` enum('conhang','saphethang','hethang','preorder','ngungkinhdoanh') DEFAULT 'conhang',
  `MaDM` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sanpham`
--

INSERT INTO `sanpham` (`MaSP`, `TenSP`, `NgheSi`, `TheLoai`, `NamPhatHanh`, `GiaBan`, `SoLuongTon`, `MoTa`, `HinhAnh`, `TinhTrang`, `MaDM`) VALUES
(1, 'Your sister like goods', 'NSUT Tiến Đạt', 'Đĩa Than (Vinyl)', NULL, 36000.00, 18, '', 'https://i.imgur.com/yTCOMLH.jpeg', 'conhang', 1),
(2, 'Abbey Road (Anniversary Edition)', 'The Beatles', 'Đĩa Than (Vinyl)', 2019, 850000.00, 14, 'Phiên bản kỷ niệm 50 năm tuyệt tác Abbey Road của The Beatles. Đĩa than 180g remaster mang lại chất âm analog hoàn hảo.', 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80', 'conhang', 1),
(3, 'Dark Side of the Moon', 'Pink Floyd', 'Đĩa Than (Vinyl)', 1973, 950000.00, 8, 'Một trong những album bán chạy nhất mọi thời đại. Trải nghiệm âm thanh psychedelic rock nguyên bản qua đĩa than.', 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80', 'saphethang', 1),
(4, 'Trịnh Công Sơn - Sơn Ca 7', 'Khánh Ly', 'Đĩa Than (Vinyl)', 1974, 1200000.00, 5, 'Album nhạc Trịnh huyền thoại qua giọng ca miên man của Khánh Ly. Bản in mới nhất năm 2023, phôi đĩa chất lượng cao nhập khẩu.', 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&q=80', 'conhang', 1),
(5, 'Random Access Memories', 'Daft Punk', 'Đĩa Than (Vinyl)', 2013, 1050000.00, 12, 'Album Electronic/Disco đỉnh cao từng đạt giải Grammy. Bản thu âm mix riêng cho đĩa than cực kỳ có chiều sâu.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', 'conhang', 1),
(6, 'Midnights (Blood Moon Edition)', 'Taylor Swift', 'Đĩa Than (Vinyl)', 2022, 1100000.00, 20, 'Phiên bản Vinyl màu đĩa đặc biệt giới hạn từ Taylor Swift.', 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80', 'conhang', 1),
(7, 'Thanh Tùng - Trái Tim Không Ngủ Yên', 'Nhiều Nghệ Sĩ', 'Đĩa Than (Vinyl)', 2020, 1500000.00, 2, 'Tuyển tập những sáng tác hay nhất của cố nhạc sĩ Thanh Tùng.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'saphethang', 1),
(8, 'Hoàng', 'Hoàng Thùy Linh', 'Đĩa Than (Vinyl)', 2019, 1800000.00, 0, 'Đĩa than nhạc Việt indie hiện đại rất được săn đón, album Hoàng của ca sĩ Thùy Linh.', 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=800&q=80', 'hethang', 1),
(9, 'Nevermind', 'Nirvana', 'Đĩa Than (Vinyl)', 1991, 890000.00, 10, 'Kỷ nguyên Grunge bắt đầu từ đây. Một sản phẩm mang tính thời đại.', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', 'conhang', 1),
(10, 'Guardians of the Galaxy: Awesome Mix Vol. 1', 'Various Artists', 'Cassette', 2014, 350000.00, 30, 'Băng Cassette nhạc phim vệ binh dải ngân hà với những giai điệu thập niên 70-80.', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', 'conhang', 2),
(11, 'Thriller', 'Michael Jackson', 'Cassette', 1982, 450000.00, 5, 'Băng vintage hiếm của ông hoàng nhạc Pop Michael Jackson.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', 'saphethang', 2),
(12, 'Đan Trường - Vol.1', 'Đan Trường', 'Cassette', 1999, 150000.00, 2, 'Chiếc băng cassette gợi lại kỷ niệm Làn Sóng Xanh thập niên 90.', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80', 'saphethang', 2),
(13, 'Audio-Technica AT-LP120XUSB', 'Audio-Technica', 'Máy Quay Đĩa (Turntable)', 2021, 8500000.00, 5, 'Máy quay đĩa chuyên nghiệp dành cho DJ và người chơi Audiophile. Direct-drive motor mạnh mẽ.', 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&q=80', 'conhang', 3),
(14, 'Rega Planar 1', 'Rega', 'Máy Quay Đĩa (Turntable)', 2022, 9900000.00, 3, 'Turntable nhập khẩu từ UK. Thiết kế tối giản, chất âm Audiophile xuất sắc trong tầm giá.', 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=800&q=80', 'conhang', 3),
(15, 'Sony PS-LX310BT', 'Sony', 'Máy Quay Đĩa (Turntable)', 2020, 4500000.00, 8, 'Mầm than có tích hợp Bluetooth chuẩn aptX tiện dụng, chỉ cần kết nối với dàn loa là phát nhạc.', 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&q=80', 'conhang', 3),
(16, 'Crosley Cruiser Deluxe', 'Crosley', 'Máy Quay Đĩa (Turntable)', 2023, 2200000.00, 0, 'Máy quay đĩa dạng vali cổ điển. Thích hợp để decor phòng. Hiện đang hết hàng.', 'https://images.unsplash.com/photo-1458560871784-56d23406c091?w=800&q=80', 'hethang', 3),
(17, 'Chổi Carbon Fiber vệ sinh đĩa than', 'Audio-Technica', 'Phụ Kiện', 2024, 350000.00, 50, 'Chổi làm sạch bụi, giảm tĩnh điện chuyên dụng giúp bảo vệ rãnh đĩa than.', 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&q=80', 'conhang', 4),
(18, 'Dung dịch rửa đĩa mâm than', 'Spin-Clean', 'Phụ Kiện', 2024, 450000.00, 20, 'Nước rửa đĩa chuyên dụng phục hồi độ bóng và lấy đi các hạt bụi bẩn bám sâu.', 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&q=80', 'conhang', 4),
(19, 'Kim đọc đĩa than Ortofon 2M Red', 'Ortofon', 'Phụ Kiện', 2024, 2500000.00, 10, 'Mũi kim huyền thoại được tin dùng bởi nhiều audiophiles.', 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&q=80', 'conhang', 4),
(20, 'Vỏ bọc đĩa than chống tĩnh điện (Xấp 50 cái)', 'MoFi', 'Phụ Kiện', 2024, 800000.00, 15, 'Vỏ đựng đĩa master sleeve giúp chống mốc và bụi cho đĩa tĩnh điện.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'conhang', 4),
(21, 'Plastic Love (Single)', 'Mariya Takeuchi', 'CITY POP', 1984, 1200000.00, 5, 'Đĩa than 12-inch 45 RPM cực hiếm của nữ hoàng City Pop Nhật Bản Mariya Takeuchi. Bản tình ca làm mưa làm gió trên YouTube.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', 'conhang', 1),
(22, 'Discovery', 'Daft Punk', 'ELECTRONIC', 2001, 850000.00, 12, 'Một trong những album Electronic vĩ đại nhất mọi thời đại. Bao gồm One More Time và Harder, Better, Faster, Stronger.', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', 'conhang', 1),
(23, 'Hotel California', 'Eagles', 'CLASSIC ROCK', 1976, 1100000.00, 4, 'Album kinh điển của ban nhạc Eagles với tiếng guitar solo huyền thoại. Bản remastered analog chính hãng.', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&q=80', 'conhang', 1),
(24, 'Kind of Blue', 'Miles Davis', 'JAZZ', 1959, 950000.00, 8, 'Được coi là album Jazz bán chạy nhất lịch sử. Một tác phẩm nghệ thuật không thể thiếu cho dân chơi mâm đĩa than.', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80', 'conhang', 1),
(25, 'Interstellar OST', 'Hans Zimmer', 'SOUNDTRACK', 2014, 1800000.00, 3, 'Bản nhạc phim không gian huyền thoại của Hans Zimmer, định dạng đĩa than đôi (2xLP) với chất âm cực rộng.', 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80', 'conhang', 1),
(26, 'To Pimp a Butterfly', 'Kendrick Lamar', 'HIP HOP', 2015, 890000.00, 10, 'Một tuyệt tác Hip Hop pha lẫn Jazz và Funk. TPAB được giới phê bình ca ngợi là album xuất sắc nhất thập kỷ 2010s.', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80', 'conhang', 1),
(27, 'MỘT NGÀN CHÍN TRĂM HỒI ĐÓ', 'Đen Vâu', 'VIỆT NAM', 2021, 1250000.00, 0, 'Đĩa than HipHop Việt Nam đầu tiên đạt kỷ lục doanh số. Hàng giới hạn cực kỳ đáng sưu tầm.', 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=800&q=80', 'hethang', 1),
(28, 'Christmas', 'Michael Bublé', 'CHRISTMAS', 2011, 750000.00, 20, 'Album nhạc Giáng Sinh tuyệt vời nhất hiện đại, định dạng đĩa than màu đỏ đun đặc biệt.', 'https://images.unsplash.com/photo-1543258103-a62bdc069871?w=800&q=80', 'conhang', 1),
(29, 'The Four Seasons', 'Vivaldi', 'CLASSICAL', 1725, 900000.00, 6, 'Bản giao hưởng Bốn Mùa do Dàn nhạc giao hưởng London trình diễn. Đĩa than audiophile.', 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80', 'conhang', 1),
(30, 'The King of the Blues', 'B.B. King', 'BLUES', 1992, 820000.00, 5, 'Tuyển tập những bản Blue guitar hay nhất của huyền thoại B.B King cùng cây Lucille.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80', 'conhang', 1),
(31, 'Rumours', 'Fleetwood Mac', 'ROCK', 1977, 980000.00, 7, 'Album Rock kinh điển năm 1977 với Dreams, Go Your Own Way. Đĩa than 180g remastered.', 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80', 'conhang', 1),
(32, 'Back in Black', 'AC/DC', 'ROCK', 1980, 890000.00, 10, 'Album bán chạy thứ hai mọi thời đại. Hard Rock nguyên bản với guitar riff huyền thoại của Angus Young.', 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&q=80', 'conhang', 1),
(33, 'Led Zeppelin IV', 'Led Zeppelin', 'ROCK', 1971, 1050000.00, 5, 'Chứa Stairway to Heaven - bài hát được yêu cầu nhiều nhất trên đài phát thanh Mỹ mọi thời đại.', 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=800&q=80', 'conhang', 1),
(34, 'Future Nostalgia', 'Dua Lipa', 'POP', 2020, 750000.00, 15, 'Album Pop/Disco hiện đại đoạt Grammy 2021. Bản đĩa than màu xanh neon giới hạn.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', 'conhang', 1),
(35, 'After Hours', 'The Weeknd', 'POP', 2020, 820000.00, 12, 'Blinding Lights, Save Your Tears. Album Synth-Pop tối giản đầy ma mị của The Weeknd.', 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=800&q=80', 'conhang', 1),
(36, '1989 (Taylor\'s Version)', 'Taylor Swift', 'POP', 2023, 950000.00, 5, 'Bản tái thu âm hoàn chỉnh với 5 vault tracks chưa từng phát hành. Đĩa than Tangerine Edition.', 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=800&q=80', 'conhang', 1),
(37, 'Happier Than Ever', 'Billie Eilish', 'POP', 2021, 780000.00, 9, 'Album thứ hai của hiện tượng Gen Z. Đĩa than Pale Yellow vinyl cực sang.', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', 'conhang', 1),
(38, 'Homework', 'Daft Punk', 'ELECTRONIC', 1997, 790000.00, 6, 'Album đầu tay của bộ đôi robot Pháp. Around the World, Da Funk trên đĩa than nguyên bản.', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', 'conhang', 1),
(39, 'Play', 'Moby', 'ELECTRONIC', 1999, 680000.00, 8, 'Album Electronic bán hơn 12 triệu bản toàn cầu. Porcelain, Why Does My Heart Feel So Bad.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', 'conhang', 1),
(40, 'A Love Supreme', 'John Coltrane', 'JAZZ', 1965, 1100000.00, 4, 'Kiệt tác Jazz tâm linh của John Coltrane. Bản Impulse! Records reissue 180g audiophile.', 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&q=80', 'conhang', 1),
(41, 'Blue Train', 'John Coltrane', 'JAZZ', 1958, 980000.00, 5, 'Album hard bop kinh điển với tiếng saxophone Alto đầy chất phiêu lưu.', 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80', 'conhang', 1),
(42, 'Head Hunters', 'Herbie Hancock', 'JAZZ', 1973, 850000.00, 7, 'Album Jazz-Funk bán chạy nhất lịch sử. Chameleon là track fusion bất hủ.', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80', 'conhang', 1),
(43, 'good kid, m.A.A.d city', 'Kendrick Lamar', 'HIP HOP', 2012, 820000.00, 11, 'Album concept Hip Hop kể câu chuyện lớn lên ở Compton. Swimming Pools, Bitch Don\'t Kill My Vibe.', 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80', 'conhang', 1),
(44, 'The Marshall Mathers LP', 'Eminem', 'HIP HOP', 2000, 750000.00, 9, 'Album Rap có tốc độ bán nhanh nhất kỷ lục trong lịch sử âm nhạc Mỹ. Stan, The Real Slim Shady.', 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=800&q=80', 'conhang', 1),
(45, 'Illmatic', 'Nas', 'HIP HOP', 1994, 890000.00, 6, 'Album debut hoàn hảo nhất trong lịch sử Hip Hop New York. N.Y. State of Mind, The World is Yours.', 'https://images.unsplash.com/photo-1460667262436-cf19894f4774?w=800&q=80', 'conhang', 1),
(46, 'What\'s Going On', 'Marvin Gaye', 'FUNK / SOUL', 1971, 1200000.00, 3, 'Album Soul concept phản chiến vĩ đại nhất. Được Rolling Stone bầu chọn #1 mọi thời đại.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', 'conhang', 1),
(47, 'Songs in the Key of Life', 'Stevie Wonder', 'FUNK / SOUL', 1976, 1350000.00, 4, 'Bộ đĩa than đôi kiệt tác của thiên tài mù Stevie Wonder. Sir Duke, Isn\'t She Lovely.', 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=800&q=80', 'conhang', 1),
(48, 'Purple Rain', 'Prince', 'FUNK / SOUL', 1984, 950000.00, 8, 'Album nhạc phim + soundtrack huyền thoại. When Doves Cry, Let\'s Go Crazy, Purple Rain.', 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=800&q=80', 'conhang', 1),
(49, 'Beethoven: Symphony No.9', 'Berlin Philharmonic', 'CLASSICAL', 1962, 1100000.00, 5, 'Bản giao hưởng số 9 \"Ode to Joy\" do Dàn nhạc Berlin trình diễn. Thu âm Deutsche Grammophon.', 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80', 'conhang', 1),
(50, 'Chopin: Nocturnes', 'Maurizio Pollini', 'CLASSICAL', 2005, 880000.00, 6, 'Toàn tập 21 bản Nocturne của Chopin qua ngón đàn tinh tế của Maurizio Pollini. 2xLP boxed.', 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80', 'conhang', 1),
(51, 'Pulp Fiction OST', 'Various Artists', 'SOUNDTRACK', 1994, 780000.00, 10, 'Soundtrack phim cult của Quentin Tarantino. Misirlou, Son of a Preacher Man trên đĩa than.', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80', 'conhang', 1),
(52, 'La La Land OST', 'Justin Hurwitz', 'SOUNDTRACK', 2016, 850000.00, 7, 'Nhạc phim đoạt Oscar sáng tác bởi Justin Hurwitz. City of Stars trên đĩa than xanh dương.', 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80', 'conhang', 1),
(53, 'Hoàng', 'Hoàng Thùy Linh', 'VIỆT NAM', 2019, 980000.00, 5, 'Album Vpop kết hợp nhạc dân gian Việt Nam với Pop hiện đại. Để Mị Nói Cho Mà Nghe, Duyên Âm.', 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=800&q=80', 'conhang', 1),
(54, 'Ai Cũng Phải Bắt Đầu Từ Đâu Đó', 'Hà Anh Tuấn', 'VIỆT NAM', 2018, 1100000.00, 2, 'Album ballad tinh tế nhất của giọng ca nội lực Hà Anh Tuấn. Định dạng đĩa than 180g limited.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', 'conhang', 1),
(55, 'Trời Hôm Nay Nhiều Mây Cực', 'Đen Vâu', 'VIỆT NAM', 2023, 890000.00, 0, 'Album HipHop Việt dạo phố cự phách. Mang Tiền Về Cho Mẹ, Nấu Ăn Cho Em.', 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=800&q=80', 'hethang', 1),
(56, 'Legend', 'Bob Marley & The Wailers', 'REGGAE', 1984, 780000.00, 12, 'Tuyển tập Reggae hay nhất mọi thời đại. No Woman No Cry, One Love, Redemption Song.', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', 'conhang', 1),
(57, 'Blonde on Blonde', 'Bob Dylan', 'FOLK', 1966, 1050000.00, 4, 'Album đĩa đôi đầu tiên trong lịch sử Rock/Folk. Rainy Day Women, Just Like a Woman.', 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=800&q=80', 'conhang', 1),
(58, 'Ride on Time', 'Tatsuro Yamashita', 'CITY POP', 1980, 1500000.00, 3, 'Album City Pop huyền thoại của ông hoàng nhạc Nhật. Bản pressing gốc cực hiếm.', 'https://images.unsplash.com/photo-1484876065684-b683cf17d276?w=800&q=80', 'conhang', 1),
(59, 'Timely!!', 'Anri', 'CITY POP', 1983, 1300000.00, 4, 'Album City Pop mùa hè rực rỡ nhất. Cat\'s Eye, Remember Summer Days. Đĩa than OBI strip.', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', 'conhang', 1),
(60, 'Buena Vista Social Club', 'Buena Vista Social Club', 'LATIN', 1997, 920000.00, 6, 'Album nhạc Cuba huyền thoại đoạt Grammy. Chan Chan, Dos Gardenias trên đĩa than 180g.', 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=800&q=80', 'conhang', 1),
(61, 'Born Under a Bad Sign', 'Albert King', 'BLUES', 1967, 750000.00, 7, 'Album Blues guitar kinh điển ảnh hưởng cả Jimi Hendrix và Stevie Ray Vaughan.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80', 'conhang', 1),
(62, 'Kim Đầu Đĩa Audio-Technica AT-VM95E', 'Audio-Technica', 'Phụ Kiện', 2024, 1200000.00, 20, 'Kim đầu đĩa VM95E với đầu kim Elliptical bonded cho chất âm ấm áp, chi tiết. Tương thích hầu hết mâm đĩa.', 'https://images.unsplash.com/photo-1583267746897-2cf415887172?w=800&q=80', 'conhang', 1),
(63, 'Bộ Vệ Sinh Đĩa Than Premium Kit', 'Vinyl Buddy', 'Phụ Kiện', 2024, 450000.00, 25, 'Bao gồm bàn chải carbon fiber, dung dịch vệ sinh chuyên dụng và vải microfiber. Bảo vệ đĩa than khỏi bụi bẩn.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'conhang', 1),
(64, 'Khung Treo Đĩa Than Trang Trí (Bộ 6)', 'Vinyl Display', 'Phụ Kiện', 2024, 350000.00, 30, 'Bộ 6 khung treo tường bằng acrylic trong suốt. Trưng bày bìa album như tranh nghệ thuật.', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', 'conhang', 1),
(65, 'Cassette Player Retro Walkman', 'NINM Lab', 'Cassette', 2024, 1800000.00, 8, 'Máy nghe băng cassette retro hiện đại có Bluetooth 5.0. Thiết kế trong suốt cực đẹp.', 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=800&q=80', 'conhang', 1),
(66, 'Băng Cassette Trắng C-60 (Hộp 5 cuộn)', 'Maxell', 'Cassette', 2024, 250000.00, 50, 'Băng cassette trắng 60 phút chất lượng cao Maxell UR. Hoàn hảo để thu âm mix tape cá nhân.', 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=800&q=80', 'conhang', 1),
(67, 'Pro-Ject Debut Carbon EVO', 'Pro-Ject', 'Máy Quay Đĩa (Turntable)', 2024, 12500000.00, 3, 'Mâm đĩa Hi-Fi tầm trung cao cấp nhất. Tonearm carbon fiber, motor DC chính xác, đế MDF chống rung.', 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800&q=80', 'conhang', 1),
(68, 'Thuwthuw', 'N  ', 'Đĩa Than (Vinyl)', 2024, 5000.00, 0, '', 'https://plus.unsplash.com/premium_photo-1726930175724-dbc536736a7b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'conhang', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sodiachi`
--

CREATE TABLE `sodiachi` (
  `MaDC` int(11) NOT NULL,
  `MaKH` int(11) DEFAULT NULL,
  `NguoiNhan` varchar(100) NOT NULL,
  `SoDienThoai` varchar(20) NOT NULL,
  `DiaChi` text NOT NULL,
  `MacDinh` tinyint(1) DEFAULT 0,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sodiachi`
--

INSERT INTO `sodiachi` (`MaDC`, `MaKH`, `NguoiNhan`, `SoDienThoai`, `DiaChi`, `MacDinh`, `NgayTao`) VALUES
(1, 2, 'Khách Hàng Vip', '0766255478', 'Ngõ 57 Láng Hạ- Ba Đình\nsdf', 0, '2026-04-08 05:13:13'),
(2, 2, '56', '76', '76', 0, '2026-04-21 11:43:09');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `taikhoan`
--

CREATE TABLE `taikhoan` (
  `MaTK` int(11) NOT NULL,
  `TenDangNhap` varchar(50) NOT NULL,
  `MatKhau` varchar(255) NOT NULL,
  `VaiTro` enum('khachhang','nhanvien','admin') DEFAULT 'khachhang',
  `TrangThai` tinyint(1) DEFAULT 1,
  `NgayTao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `taikhoan`
--

INSERT INTO `taikhoan` (`MaTK`, `TenDangNhap`, `MatKhau`, `VaiTro`, `TrangThai`, `NgayTao`) VALUES
(4, 'admin', '$2y$10$pEC6VOoQFHxnTQ7VcIW1Re8DXz3Q7EIbTUpx2zmoHW2zvdW9epXMm', 'admin', 1, '2026-04-07 14:22:04'),
(5, 'nhanvien', '$2y$10$pEC6VOoQFHxnTQ7VcIW1Re8DXz3Q7EIbTUpx2zmoHW2zvdW9epXMm', 'nhanvien', 1, '2026-04-07 14:22:04'),
(6, 'khachhang', '$2y$10$pEC6VOoQFHxnTQ7VcIW1Re8DXz3Q7EIbTUpx2zmoHW2zvdW9epXMm', 'khachhang', 1, '2026-04-07 14:22:04');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `thanhtoan`
--

CREATE TABLE `thanhtoan` (
  `MaTT` int(11) NOT NULL,
  `MaDH` int(11) DEFAULT NULL,
  `SoTien` decimal(15,2) DEFAULT NULL,
  `HinhThuc` enum('tiemmat','chuyenkhoan','cod','payos','momo','vnpay') DEFAULT 'cod',
  `TrangThaiTT` enum('chuathanhtoan','dangxuly','dathanhtoan','thatbai','dahuy') DEFAULT 'chuathanhtoan',
  `MaGiaoDich` varchar(100) DEFAULT NULL,
  `NgayTT` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `thanhtoan`
--

INSERT INTO `thanhtoan` (`MaTT`, `MaDH`, `SoTien`, `HinhThuc`, `TrangThaiTT`, `MaGiaoDich`, `NgayTT`) VALUES
(1, 1, 36000.00, 'payos', 'dathanhtoan', 'MOCK-PAYOS-1775574424342', NULL),
(2, 2, 850000.00, 'cod', 'chuathanhtoan', NULL, NULL),
(3, 3, 1500000.00, 'payos', 'dathanhtoan', 'MOCK-PAYOS-1775623526658', NULL),
(8, 8, 1100000.00, 'payos', 'chuathanhtoan', '17756245048', NULL),
(9, 9, 1900000.00, 'cod', 'chuathanhtoan', NULL, NULL),
(10, 10, 1100000.00, 'payos', 'chuathanhtoan', '177562534510', NULL),
(11, 11, 5000.00, 'payos', 'dathanhtoan', '177589309411', NULL),
(12, 12, 5000.00, 'payos', 'chuathanhtoan', '177601634612', NULL),
(13, 13, 5000.00, 'payos', 'chuathanhtoan', '177601635313', NULL),
(14, 14, 5000.00, 'payos', 'dathanhtoan', '177677169814', NULL),
(15, 15, 950000.00, 'cod', 'chuathanhtoan', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `yeuthich`
--

CREATE TABLE `yeuthich` (
  `MaYT` int(11) NOT NULL,
  `MaKH` int(11) DEFAULT NULL,
  `MaSP` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `baiviet`
--
ALTER TABLE `baiviet`
  ADD PRIMARY KEY (`MaBV`),
  ADD KEY `MaTK` (`MaTK`);

--
-- Chỉ mục cho bảng `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD PRIMARY KEY (`MaCTDH`),
  ADD KEY `MaDH` (`MaDH`),
  ADD KEY `MaSP` (`MaSP`);

--
-- Chỉ mục cho bảng `chitietgiohang`
--
ALTER TABLE `chitietgiohang`
  ADD PRIMARY KEY (`MaCTGH`),
  ADD KEY `MaGH` (`MaGH`),
  ADD KEY `MaSP` (`MaSP`);

--
-- Chỉ mục cho bảng `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD PRIMARY KEY (`MaCTPN`),
  ADD KEY `MaPN` (`MaPN`),
  ADD KEY `MaSP` (`MaSP`);

--
-- Chỉ mục cho bảng `danhmuc`
--
ALTER TABLE `danhmuc`
  ADD PRIMARY KEY (`MaDM`);

--
-- Chỉ mục cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`MaDH`),
  ADD KEY `MaKH` (`MaKH`),
  ADD KEY `fk_donhang_nhanvien` (`MaNVXuLy`);

--
-- Chỉ mục cho bảng `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`MaGH`),
  ADD KEY `MaKH` (`MaKH`);

--
-- Chỉ mục cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD PRIMARY KEY (`MaKH`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `MaTK` (`MaTK`);

--
-- Chỉ mục cho bảng `magiamgia`
--
ALTER TABLE `magiamgia`
  ADD PRIMARY KEY (`MaGG`),
  ADD UNIQUE KEY `Code` (`Code`);

--
-- Chỉ mục cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD PRIMARY KEY (`MaNV`),
  ADD KEY `MaTK` (`MaTK`);

--
-- Chỉ mục cho bảng `nhatkyhoatdong`
--
ALTER TABLE `nhatkyhoatdong`
  ADD PRIMARY KEY (`MaNK`),
  ADD KEY `MaTK` (`MaTK`);

--
-- Chỉ mục cho bảng `otpcodes`
--
ALTER TABLE `otpcodes`
  ADD PRIMARY KEY (`MaOTP`),
  ADD KEY `idx_email_code` (`Email`,`MaCode`);

--
-- Chỉ mục cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD PRIMARY KEY (`MaPN`),
  ADD KEY `MaNV` (`MaNV`);

--
-- Chỉ mục cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`MaSP`),
  ADD KEY `MaDM` (`MaDM`);

--
-- Chỉ mục cho bảng `sodiachi`
--
ALTER TABLE `sodiachi`
  ADD PRIMARY KEY (`MaDC`),
  ADD KEY `MaKH` (`MaKH`);

--
-- Chỉ mục cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`MaTK`),
  ADD UNIQUE KEY `TenDangNhap` (`TenDangNhap`);

--
-- Chỉ mục cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD PRIMARY KEY (`MaTT`),
  ADD KEY `MaDH` (`MaDH`);

--
-- Chỉ mục cho bảng `yeuthich`
--
ALTER TABLE `yeuthich`
  ADD PRIMARY KEY (`MaYT`),
  ADD KEY `MaKH` (`MaKH`),
  ADD KEY `MaSP` (`MaSP`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `baiviet`
--
ALTER TABLE `baiviet`
  MODIFY `MaBV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  MODIFY `MaCTDH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `chitietgiohang`
--
ALTER TABLE `chitietgiohang`
  MODIFY `MaCTGH` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  MODIFY `MaCTPN` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `danhmuc`
--
ALTER TABLE `danhmuc`
  MODIFY `MaDM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `donhang`
--
ALTER TABLE `donhang`
  MODIFY `MaDH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `giohang`
--
ALTER TABLE `giohang`
  MODIFY `MaGH` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  MODIFY `MaKH` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `magiamgia`
--
ALTER TABLE `magiamgia`
  MODIFY `MaGG` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  MODIFY `MaNV` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `nhatkyhoatdong`
--
ALTER TABLE `nhatkyhoatdong`
  MODIFY `MaNK` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `otpcodes`
--
ALTER TABLE `otpcodes`
  MODIFY `MaOTP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  MODIFY `MaPN` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `MaSP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT cho bảng `sodiachi`
--
ALTER TABLE `sodiachi`
  MODIFY `MaDC` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `MaTK` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  MODIFY `MaTT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `yeuthich`
--
ALTER TABLE `yeuthich`
  MODIFY `MaYT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `baiviet`
--
ALTER TABLE `baiviet`
  ADD CONSTRAINT `baiviet_ibfk_1` FOREIGN KEY (`MaTK`) REFERENCES `taikhoan` (`MaTK`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `chitietdonhang`
--
ALTER TABLE `chitietdonhang`
  ADD CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`MaDH`) REFERENCES `donhang` (`MaDH`) ON DELETE CASCADE,
  ADD CONSTRAINT `chitietdonhang_ibfk_2` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `chitietgiohang`
--
ALTER TABLE `chitietgiohang`
  ADD CONSTRAINT `chitietgiohang_ibfk_1` FOREIGN KEY (`MaGH`) REFERENCES `giohang` (`MaGH`) ON DELETE CASCADE,
  ADD CONSTRAINT `chitietgiohang_ibfk_2` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `chitietphieunhap`
--
ALTER TABLE `chitietphieunhap`
  ADD CONSTRAINT `chitietphieunhap_ibfk_1` FOREIGN KEY (`MaPN`) REFERENCES `phieunhap` (`MaPN`) ON DELETE CASCADE,
  ADD CONSTRAINT `chitietphieunhap_ibfk_2` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`MaKH`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_donhang_nhanvien` FOREIGN KEY (`MaNVXuLy`) REFERENCES `nhanvien` (`MaNV`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `giohang_ibfk_1` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`MaKH`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `khachhang`
--
ALTER TABLE `khachhang`
  ADD CONSTRAINT `khachhang_ibfk_1` FOREIGN KEY (`MaTK`) REFERENCES `taikhoan` (`MaTK`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `nhanvien`
--
ALTER TABLE `nhanvien`
  ADD CONSTRAINT `nhanvien_ibfk_1` FOREIGN KEY (`MaTK`) REFERENCES `taikhoan` (`MaTK`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `nhatkyhoatdong`
--
ALTER TABLE `nhatkyhoatdong`
  ADD CONSTRAINT `nhatkyhoatdong_ibfk_1` FOREIGN KEY (`MaTK`) REFERENCES `taikhoan` (`MaTK`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `phieunhap`
--
ALTER TABLE `phieunhap`
  ADD CONSTRAINT `phieunhap_ibfk_1` FOREIGN KEY (`MaNV`) REFERENCES `nhanvien` (`MaNV`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`MaDM`) REFERENCES `danhmuc` (`MaDM`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `sodiachi`
--
ALTER TABLE `sodiachi`
  ADD CONSTRAINT `sodiachi_ibfk_1` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`MaKH`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD CONSTRAINT `thanhtoan_ibfk_1` FOREIGN KEY (`MaDH`) REFERENCES `donhang` (`MaDH`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `yeuthich`
--
ALTER TABLE `yeuthich`
  ADD CONSTRAINT `yeuthich_ibfk_1` FOREIGN KEY (`MaKH`) REFERENCES `khachhang` (`MaKH`) ON DELETE CASCADE,
  ADD CONSTRAINT `yeuthich_ibfk_2` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
