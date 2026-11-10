-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Nov 10, 2026 at 02:24 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saud_trading_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_content`
--

CREATE TABLE `about_content` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `description` text DEFAULT NULL,
  `image_url` varchar(500) NOT NULL DEFAULT '',
  `mission` text DEFAULT NULL,
  `vision` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about_content`
--

INSERT INTO `about_content` (`id`, `title`, `description`, `image_url`, `mission`, `vision`) VALUES
(1, 'رؤيتنا', '', '', '', 'نسعى لأن نكون من الجهات الرائدة في تقديم الخدمات التجارية باحترافية وثقة مع بناء علاقات طويلة المدى مع عملائنا.');

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `id` int(10) UNSIGNED NOT NULL,
  `admin_id` int(10) UNSIGNED DEFAULT NULL,
  `action` varchar(100) NOT NULL,
  `details` varchar(500) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`id`, `admin_id`, `action`, `details`, `created_at`) VALUES
(1, 1, 'Logged in', 'admin', '2026-09-30 16:10:59'),
(2, 1, 'Updated Product', 'بوليثيلين عالي الكثافة (HDPE)', '2026-09-30 16:12:44'),
(3, 1, 'Logged in', 'admin', '2026-09-30 17:21:56'),
(4, 1, 'Logged in', 'admin', '2026-10-02 15:05:51'),
(5, 1, 'Logged in', 'admin', '2026-10-03 07:56:40'),
(6, 1, 'Reordered Hero Slides', '', '2026-10-03 08:34:26'),
(7, 1, 'Reordered Hero Slides', '', '2026-10-03 08:34:35'),
(8, 1, 'Reordered Hero Slides', '', '2026-10-03 08:35:11'),
(9, 1, 'Reordered Hero Slides', '', '2026-10-03 08:35:15'),
(10, 1, 'Logged in', 'admin', '2026-10-08 07:20:06'),
(11, 1, 'Logged in', 'admin', '2026-10-12 10:29:41'),
(12, 1, 'Logged in', 'admin', '2026-10-24 09:32:57'),
(13, 1, 'Created Brand', 'Gucci', '2026-10-24 10:07:53'),
(14, 1, 'Deleted Brand', '#1', '2026-10-24 10:34:51');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(150) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password_hash`, `email`, `created_at`) VALUES
(1, 'admin', '$2y$10$1.v52OgZhifkQ6jJKM0/TedD9eomafOCPwuXtcILUO1zeIakrET3K', '', '2026-09-30 16:10:27');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo_url` varchar(500) NOT NULL DEFAULT '',
  `website_url` varchar(500) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `sector_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `sector_id`, `name`, `sort_order`) VALUES
(1, 1, 'بوليمرات خام', 1),
(2, 1, 'تعبئة وتغليف', 2),
(3, 1, 'حلول صناعية', 3),
(4, 2, 'الأرز والحبوب', 1),
(5, 2, 'الزيوت النباتية', 2),
(6, 2, 'البقوليات', 3),
(7, 2, 'البذور الزيتية', 4),
(8, 2, 'المكسرات', 5),
(9, 2, 'الشوكولاتة', 6),
(10, 2, 'البن والقهوة', 7),
(11, 3, 'تطوير المواقع', 1),
(12, 3, 'التسويق الرقمي', 2),
(13, 3, 'الإنتاج الإبداعي', 3),
(14, 3, 'تغطية إعلامية', 4),
(15, 3, 'مشاهير', 5),
(16, 3, 'حفلات افتتاح أو تغطية', 6);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `logo_url` varchar(500) NOT NULL DEFAULT '',
  `description` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `logo_url`, `description`, `sort_order`, `is_active`) VALUES
(1, 'وزارة الصحة', 'uploads/clients/ministry-of-health.png', NULL, 1, 1),
(2, 'الهيئة العامة للترفيه', 'uploads/clients/gea.png', NULL, 2, 1),
(3, 'البنك الأول SAB', 'uploads/clients/sab.png', NULL, 3, 1),
(4, 'بنك الرياض', 'uploads/clients/riyad-bank.png', NULL, 4, 1),
(5, '1/2M', 'uploads/clients/half-m.png', NULL, 5, 1),
(6, 'Sign', 'uploads/clients/sign.png', NULL, 6, 1),
(7, 'جامعة الملك سعود', 'uploads/clients/king-saud-university.png', NULL, 7, 1),
(8, 'الجامعة العربية المفتوحة', 'uploads/clients/aou.png', NULL, 8, 1),
(9, 'Alibaba.com', 'uploads/clients/alibaba.png', NULL, 9, 1),
(10, 'نقي NAQI', 'uploads/clients/naqi.png', NULL, 10, 1),
(11, 'مدارس المملكة', 'uploads/clients/kingdom-schools.png', NULL, 11, 1);

-- --------------------------------------------------------

--
-- Table structure for table `comparison_rows`
--

CREATE TABLE `comparison_rows` (
  `id` int(10) UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `traditional` varchar(255) NOT NULL DEFAULT '',
  `smart` varchar(255) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comparison_rows`
--

INSERT INTO `comparison_rows` (`id`, `label`, `traditional`, `smart`, `sort_order`) VALUES
(1, 'المدة', 'إنجاز يستغرق أسابيع', 'إنجاز في أيام أسرع 10 مرات', 1),
(2, 'القرار', 'قرارات مبنية على التخمين', 'قرارات مبنية على تحليل البيانات', 2),
(3, 'التكلفة', 'تكاليف تشغيلية عالية', 'تقليل التكاليف حتى 80%', 3),
(4, 'الأداء', 'أداء ثابت لا يتطور', 'أنظمة تتعلم وتتحسن مع كل مشروع', 4);

-- --------------------------------------------------------

--
-- Table structure for table `contact_info`
--

CREATE TABLE `contact_info` (
  `id` int(10) UNSIGNED NOT NULL,
  `phone` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(150) NOT NULL DEFAULT '',
  `address` text DEFAULT NULL,
  `map_url` varchar(1000) NOT NULL DEFAULT '',
  `working_hours` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_info`
--

INSERT INTO `contact_info` (`id`, `phone`, `email`, `address`, `map_url`, `working_hours`) VALUES
(1, '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(50) NOT NULL DEFAULT '',
  `subject` varchar(255) NOT NULL DEFAULT '',
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `english` varchar(255) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `english`, `sort_order`) VALUES
(1, 'السعودية', 'Saudi Arabia', 1),
(2, 'مصر', 'Egypt', 2),
(3, 'الإمارات', 'United Arab Emirates', 3);

-- --------------------------------------------------------

--
-- Table structure for table `digital_ecosystem`
--

CREATE TABLE `digital_ecosystem` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(60) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `digital_ecosystem`
--

INSERT INTO `digital_ecosystem` (`id`, `title`, `description`, `icon`, `sort_order`) VALUES
(1, 'استهداف ذكي', 'دقة في الوصول لجمهورك المثالي.', 'Target', 1),
(2, 'ذكاء اصطناعي متقدم', 'تحليل ذكي وتعلم مستمر لأفضل النتائج.', 'Bot', 2),
(3, 'أتمتة العمليات', 'توفير الوقت والجهد وزيادة الإنتاجية.', 'Zap', 3),
(4, 'تحليلات دقيقة', 'تقارير لحظية لقرارات مبنية على بيانات.', 'BarChart3', 4);

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(10) UNSIGNED NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hero_slides`
--

CREATE TABLE `hero_slides` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL DEFAULT '',
  `description` text DEFAULT NULL,
  `image_url` varchar(500) NOT NULL DEFAULT '',
  `cta_text` varchar(100) NOT NULL DEFAULT '',
  `cta_link` varchar(255) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hero_slides`
--

INSERT INTO `hero_slides` (`id`, `title`, `subtitle`, `description`, `image_url`, `cta_text`, `cta_link`, `sort_order`, `is_active`) VALUES
(1, 'نربط العالم بأمانة سعودية', 'ريادة التجارة العالمية', 'حلول متكاملة لسلاسل الإمداد، من المواد الخام البلاستيكية إلى أجود أنواع الأغذية العالمية، بمعايير تتجاوز التوقعات.', 'uploads/hero/hero-port.jpg', 'استكشف قطاعاتنا', '#sectors', 1, 1),
(2, 'رؤية سعودية تتجاوز الحدود', 'رؤية سعودية عالمية', 'من قلب المملكة إلى أسواق مصر والإمارات، نبني منظومة تجارية ورقمية متكاملة تواكب رؤية 2030.', 'uploads/hero/hero-skyline.jpg', 'عن سعود التجارية', '#about', 2, 1),
(3, 'شبكة عالمية من الشركاء والموارد', 'شبكة مترابطة', 'أكثر من 45 سوقاً دولياً ومنظومة رقمية مدعومة بالذكاء الاصطناعي تربطك بعملائك أينما كانوا.', 'uploads/hero/hero-globe.jpg', 'تواصل معنا', '#contact', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(60) NOT NULL DEFAULT '',
  `blurb` text DEFAULT NULL,
  `image` varchar(500) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `icon`, `blurb`, `image`, `sort_order`, `is_active`) VALUES
(1, 1, 'بوليثيلين عالي الكثافة (HDPE)', 'Boxes', 'حبيبات عالية الكثافة لقولبة الحاويات والأنابيب.', 'uploads/products/eb447de9b986815d.jpg', 1, 1),
(2, 1, 'بوليثيلين منخفض الكثافة (LDPE)', 'Layers', 'مرونة عالية لأفلام التغليف والأكياس الصناعية.', 'uploads/products/ldpe.jfif', 2, 1),
(3, 1, 'بولي بروبلين (PP)', 'CircleDot', 'مقاومة حرارية ممتازة للتطبيقات الصناعية والمنزلية.', 'uploads/products/pp.jfif', 3, 1),
(4, 2, 'أفلام تغليف مرنة', 'Scroll', 'أفلام أحادية وثلاثية الطبقات بمواصفات تصديرية.', 'uploads/products/flexible-film.jfif', 4, 1),
(5, 2, 'أكياس صناعية', 'ShoppingBag', 'أكياس نسيجية وشبكية بأحمال تحمل متفاوتة.', 'uploads/products/industrial-bags.jfif', 5, 1),
(6, 2, 'عبوات غذائية', 'Container', 'عبوات آمنة غذائياً معتمدة من جهات الرقابة الدولية.', 'uploads/products/food-containers.jfif', 6, 1),
(7, 3, 'مركبات بلاستيكية', 'FlaskConical', 'خلطات مخصصة حسب متطلبات خط الإنتاج.', 'uploads/products/plastic-compounds.jfif', 7, 1),
(8, 3, 'إضافات تصنيع', 'Beaker', 'إضافات تحسّن الأداء الحراري والميكانيكي للمنتج.', 'uploads/products/manufacturing-additives.jfif', 8, 1),
(9, 3, 'مواد معاد تدويرها', 'Recycle', 'حلول مستدامة بمعايير جودة تعادل المواد الخام.', 'uploads/products/recycled-materials.jfif', 9, 1),
(10, 4, 'أرز بسمتي ملكي', 'Wheat', 'حبة طويلة وعطر مميز من أجود مصادر الاستيراد.', 'uploads/products/basmati-rice.jfif', 10, 1),
(11, 4, 'أرز مصري قصير الحبة', 'Sprout', 'مثالي للأطباق التقليدية بقوام متماسك.', 'uploads/products/egyptian-rice.jfif', 11, 1),
(12, 4, 'قمح وطحين فاخر', 'Wheat', 'قمح مطحون بمعايير صارمة لصناعات المخابز.', 'uploads/products/wheat-flour.jfif', 12, 1),
(13, 4, 'شعير علف وتصنيع', 'Sprout', 'دفعات كبيرة لصناعات الأعلاف والتصنيع الغذائي.', 'uploads/products/barley.jfif', 13, 1),
(14, 5, 'زيت زيتون بكر ممتاز', 'Droplet', 'استخلاص بارد ونسبة حموضة منخفضة.', 'uploads/products/olive-oil.jfif', 14, 1),
(15, 5, 'زيت دوار الشمس', 'Droplets', 'نقاء عالٍ ومناسب للاستخدام المنزلي والصناعي.', 'uploads/products/sunflower-oil.jfif', 15, 1),
(16, 5, 'زيت الذرة', 'Droplet', 'خيار اقتصادي بثبات حراري جيد للقلي.', 'uploads/products/corn-oil.jfif', 16, 1),
(17, 5, 'زيت الصويا', 'Droplets', 'توريد بالجملة لمصانع التعبئة وإعادة التكرير.', 'uploads/products/soybean-oil.jfif', 17, 1),
(18, 5, 'زيت النخيل', 'Droplet', 'مواصفات تصديرية لصناعات الأغذية والتصنيع.', 'uploads/products/palm-oil.jfif', 18, 1),
(19, 6, 'عدس أحمر مصري', 'Bean', 'تدرّج لوني موحّد وزمن طبخ قصير.', 'uploads/products/red-lentils.jfif', 19, 1),
(20, 6, 'عدس أصفر مقشر', 'Bean', 'منتج مقشور بالكامل جاهز للتعبئة الاستهلاكية.', 'uploads/products/yellow-lentils.jfif', 20, 1),
(21, 6, 'حمص فاخر', 'Nut', 'حبة كاملة ومنتظمة الحجم لأسواق التجزئة.', 'uploads/products/chickpeas.jfif', 21, 1),
(22, 6, 'فاصوليا بيضاء', 'Bean', 'توريد منتظم بأحجام تعبئة مرنة.', 'uploads/products/white-beans.jfif', 22, 1),
(23, 7, 'سمسم مقشر', 'Sprout', 'نقاء عالٍ ولون موحّد لصناعات الطحينة والحلويات والمخابز.', 'uploads/products/Hulled-sesame.jfif', 23, 1),
(24, 7, 'سمسم طبيعي غير مقشر', 'Sprout', 'محتوى زيتي مرتفع مناسب للعصر والتصنيع الغذائي.', 'uploads/products/unhulled-sesame.jfif', 24, 1),
(25, 7, 'بذور دوار الشمس', 'Leaf', 'بذور مفحوصة للتسالي والتعبئة ولاستخلاص الزيوت.', 'uploads/products/Sunflower-seeds.jfif', 25, 1),
(26, 7, 'بذور الكتان', 'Sprout', 'بذور غنية بالأوميغا 3 لصناعات المخابز والأغذية الصحية.', 'uploads/products/Flax-seeds.jfif', 26, 1),
(27, 7, 'حبة البركة', 'Leaf', 'بذور معتمدة ونقية للاستخدام الغذائي والعشبي وعصر الزيت.', 'uploads/products/Black-Cumin.jfif', 27, 1),
(28, 7, 'بذور اليقطين', 'Nut', 'بذور خضراء مقشرة وغير مقشرة لأسواق المكسرات والتسالي.', 'uploads/products/Pumpkin-seeds.jfif', 28, 1),
(29, 8, 'كاجو (الكاشو)', 'Nut', 'أحجام متعددة بدرجات جودة تصديرية للتجزئة والتصنيع.', 'uploads/products/cashew.jfif', 29, 1),
(30, 8, 'لوز', 'Nut', 'لوز كامل ومقطّع ومبشور بمواصفات مطابقة لمعايير الجودة.', 'uploads/products/almond.jfif', 30, 1),
(31, 8, 'فستق حلبي', 'Nut', 'فستق بقشره أو مقشر بنكهة غنية ولون أخضر مميز.', 'uploads/products/Aleppo-pistachio.jfif', 31, 1),
(32, 8, 'جوز', 'Nut', 'أنصاف وأرباع جوز فاتحة اللون لصناعات الحلويات والمخبوزات.', 'uploads/products/walnut.jfif', 32, 1),
(33, 8, 'بندق', 'Nut', 'بندق نيء ومحمّص مناسب لصناعة الشوكولاتة والحلويات.', 'uploads/products/hazelnut.jfif', 33, 1),
(34, 8, 'فول سوداني نيء', 'Nut', 'دفعات مفحوصة خالية من الشوائب والرطوبة الزائدة.', 'uploads/products/peanuts.jfif', 34, 1),
(35, 9, 'شوكولاتة داكنة (كوفرتشر)', 'Candy', 'نسبة كاكاو مرتفعة مخصصة للمصانع والحلواني المحترفين.', 'uploads/products/Dark-Chocolate.jfif', 35, 1),
(36, 9, 'شوكولاتة بالحليب', 'Cookie', 'قوام كريمي ونكهة متوازنة لصناعات التغليف والتغطية.', 'uploads/products/Milk-chocolate.jfif', 36, 1),
(37, 9, 'شوكولاتة بيضاء', 'Candy', 'زبدة كاكاو أصلية للحلويات والتزيين والتغطية.', 'uploads/products/white-chocolate.jfif', 37, 1),
(38, 9, 'مسحوق الكاكاو', 'Cookie', 'كاكاو طبيعي ومعالج بالقلوي للمخابز والمشروبات.', 'uploads/products/Cocoa-powder.jfif', 38, 1),
(39, 9, 'زبدة الكاكاو', 'Droplet', 'زبدة نقية لصناعات الشوكولاتة والمستحضرات التجميلية.', 'uploads/products/Cocoa-butter.jfif', 39, 1),
(40, 10, 'بن أرابيكا', 'Coffee', 'حبوب بنكهة ناعمة وحموضة متوازنة من مزارع مرتفعة.', 'uploads/products/Arabica-beans.jfif', 40, 1),
(41, 10, 'بن روبوستا', 'Coffee', 'قوام قوي ونسبة كافيين عالية، مناسب لخلطات الإسبريسو.', 'uploads/products/Robusta-beans.jfif', 41, 1),
(42, 10, 'بن إثيوبي', 'Coffee', 'نكهات زهرية وفاكهية مميزة من موطن القهوة الأصلي.', 'uploads/products/Ethiopian-coffee.jfif', 42, 1),
(43, 10, 'بن برازيلي', 'Coffee', 'نكهة كراميلية وجوز، الخيار الأول لخلطات التحميص.', 'uploads/products/Brazilian-coffee.jfif', 43, 1),
(44, 10, 'بن كولومبي', 'Coffee', 'توازن مثالي بين الحموضة والحلاوة وقوام متوسط.', 'uploads/products/Colombi-coffee.jfif', 44, 1),
(45, 10, 'بن يمني', 'Coffee', 'بن عريق بنكهة غنية وطابع خاص للأسواق الفاخرة.', 'uploads/products/yemenicoffee.jfif', 45, 1),
(46, 10, 'قهوة تركية', 'Coffee', 'طحن ناعم جداً بنكهة عالية للتحضير بالطريقة التقليدية.', 'uploads/products/Turkish-coffee.jfif', 46, 1),
(47, 10, 'قهوة عربية بالهيل', 'Coffee', 'محمصة خفيفة مع الهيل، جاهزة للضيافة العربية.', 'uploads/products/Arabic-coffee-cardamom.jfif', 47, 1),
(48, 10, 'قهوة سريعة الذوبان', 'Coffee', 'قهوة فورية بتعبئة صناعية وتجزئة بمواصفات ثابتة.', 'uploads/products/Instant-coffee.jfif', 48, 1),
(49, 11, 'مواقع ذكية تتطور مع الزوار', 'MonitorSmartphone', 'هياكل مبنية بالذكاء الاصطناعي تتكيف مع سلوك المستخدم.', 'uploads/products/smart-websites.jfif', 49, 1),
(50, 11, 'تصميم متجاوب وسرعة تنفيذ', 'Zap', 'واجهات تتكيف مع كل زائر وتحسّن معدلات التحويل.', 'uploads/products/responsive-design.jfif', 50, 1),
(51, 11, 'تحسين محركات البحث SEO', 'Radar', 'محتوى محسّن تلقائياً لضمان ظهور قوي في نتائج البحث.', 'uploads/products/seo.jfif', 51, 1),
(52, 12, 'إدارة تواصل اجتماعي 24/7', 'MessageSquare', 'تواجد دائم وتفاعل ذكي بجودة بشرية على مدار الساعة.', 'uploads/products/social-media.jfif', 52, 1),
(53, 12, 'إعلانات ممولة بدقة استهداف', 'Target', 'أقصى عائد على الاستثمار عبر استهداف آلي دقيق.', 'uploads/products/paid-ads.jfif', 53, 1),
(54, 12, 'استهداف دقيق Micro-Targeting', 'Megaphone', 'تحديد الجمهور الأكثر احتمالاً للشراء من بين الملايين.', 'uploads/products/micro-targeting.jfif', 54, 1),
(55, 13, 'تصميم هوية بصرية', 'Palette', 'هويات تدمج الحس الفني بتحليل اتجاهات السوق.', 'uploads/products/visual-identity.jfif', 55, 1),
(56, 13, 'شعارات ذكية بالذكاء الاصطناعي', 'Wand2', 'تصاميم فريدة تعكس هوية علامتك بسرعة إنتاج عالية.', 'uploads/products/ai-logos.jfif', 56, 1),
(57, 13, 'فيديو وواقع افتراضي', 'Video', 'إنتاج ضخم بتقنية الواقع الافتراضي لمحتوى استثنائي.', 'uploads/products/video-vr.jfif', 57, 1),
(58, 14, 'تغطية صحفية وتلفزيونية', 'Video', 'تغطية صحفية وتلفزيونية شاملة وتنسيق اللقاءات مع كبرى القنوات والمنصات الإخبارية.', 'uploads/products/media-tv-coverage.jpg', 1, 1),
(59, 14, 'بيانات وتقارير صحفية', 'Scroll', 'صياغة ونشر البيانات والتقارير الصحفية الاحترافية وتوزيعها عبر شبكات الإعلام الرقمي.', 'uploads/products/press-release.jpg', 2, 1),
(60, 14, 'مؤتمرات صحفية وبث مباشر', 'Radar', 'إدارة المؤتمرات الصحفية مع خدمات البث المباشر والتوثيق بجودة سينمائية متطورة.', 'uploads/products/press-conference.jpg', 3, 1),
(61, 15, 'إعلانات كبار المؤثرين', 'Star', 'حملات ترويجية مدروسة بالتعاون مع نخبة المشاهير وصناع المحتوى لتعزيز مبيعاتك وحضورك.', 'uploads/products/influencer-marketing.jpg', 1, 1),
(62, 15, 'حضور وتنسيق الفعاليات', 'Sparkles', 'تنسيق دعوة وحضور مشاهير وشخصيات مجتمعية بارزة لفعالياتك ومناسبات إطلاق علامتك.', 'uploads/products/celebrity-attendance.jpg', 2, 1),
(63, 15, 'إدارة حملات المشاهير', 'Users', 'إدارة متكاملة للعقود وصناعة الأفكار والمحتوى الإعلاني مع قياس دقيق لتفاعل الجمهور.', 'uploads/products/celebrity-campaign.jpg', 3, 1),
(64, 16, 'تنظيم وتدشين حفلات الافتتاح', 'Award', 'تنظيم فاخر لحفلات الافتتاح وتدشين المشروعات والفروع بتجهيزات مسرحية وصوتية وإضاءة مبهرة.', 'uploads/products/grand-opening.jpg', 1, 1),
(65, 16, 'تغطية الفعاليات والمعارض', 'Layers', 'توثيق شامل وتغطية سينمائية وفوتوغرافية احترافية للمعارض والمؤتمرات والملتقيات التجارية.', 'uploads/products/event-exhibition-coverage.jpg', 2, 1),
(66, 16, 'تصوير جوي وإنتاج ريلز', 'Wand2', 'لقطات جوية درون 4K وإنتاج فيديوهات ريلز سريعة وخاطفة للمشاركة الفورية على السوشيال ميديا.', 'uploads/products/drone-event-coverage.jpg', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sectors`
--

CREATE TABLE `sectors` (
  `id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `english` varchar(255) NOT NULL DEFAULT '',
  `description` text DEFAULT NULL,
  `image` varchar(500) NOT NULL DEFAULT '',
  `image_alt` varchar(255) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sectors`
--

INSERT INTO `sectors` (`id`, `slug`, `title`, `english`, `description`, `image`, `image_alt`, `sort_order`) VALUES
(1, 'plastics', 'قطاع اللدائن والبلاستيك', 'INDUSTRIAL MATERIALS', 'مواد خام موثقة المواصفات للصناعات التحويلية وحلول التعبئة.', 'uploads/sectors/plastics-sector.jpg', 'حبيبات بلاستيكية خام شفافة وخضراء', 1),
(2, 'food', 'قطاع المواد الغذائية', 'FOOD COMMODITIES', 'سلع غذائية مختارة بعناية من مصادر دولية معتمدة.', 'uploads/sectors/food-sector.jpg', 'أرز بسمتي فاخر في وعاء تقليدي', 2),
(3, 'digital', 'قطاع الحلول الرقمية', 'DIGITAL & CREATIVE SERVICES', 'منظومة رقمية متكاملة مدعومة بالذكاء الاصطناعي لبناء حضورك التجاري وتنميته.', 'uploads/sectors/hero-globe.jpg', 'شبكة رقمية عالمية مضيئة', 3);

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `setting_key`, `setting_value`) VALUES
(1, 'site_name', 'SAUD TRADING EST.'),
(2, 'tagline', ''),
(3, 'facebook', ''),
(4, 'twitter', ''),
(5, 'linkedin', ''),
(6, 'instagram', ''),
(7, 'whatsapp', '');

-- --------------------------------------------------------

--
-- Table structure for table `site_values`
--

CREATE TABLE `site_values` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(60) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `site_values`
--

INSERT INTO `site_values` (`id`, `title`, `description`, `icon`, `sort_order`) VALUES
(1, 'احترافية عالية', 'نلتزم بأعلى معايير الجودة في كل ما نقدمه.', 'Award', 1),
(2, 'ثقة وشفافية', 'نتعامل بوضوح ومصداقية في جميع تعاملاتنا.', 'ShieldCheck', 2),
(3, 'حلول مبتكرة', 'نستخدم أحدث التقنيات لتحقيق أفضل النتائج.', 'Sparkles', 3),
(4, 'نمو مستدام', 'ندعم تطور أعمال عملائنا ونساهم في نجاحهم.', 'TrendingUp', 4),
(5, 'شراكات طويلة الأمد', 'نؤمن بأهمية بناء علاقات قائمة على الثقة.', 'Handshake', 5),
(6, 'فريق متخصص', 'نضم نخبة من الخبراء لخدمتكم بأفضل كفاءة.', 'Users', 6);

-- --------------------------------------------------------

--
-- Table structure for table `stats`
--

CREATE TABLE `stats` (
  `id` int(10) UNSIGNED NOT NULL,
  `value` varchar(100) NOT NULL,
  `label` varchar(255) NOT NULL,
  `icon` varchar(60) NOT NULL DEFAULT '',
  `suffix` varchar(30) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stats`
--

INSERT INTO `stats` (`id`, `value`, `label`, `icon`, `suffix`, `sort_order`) VALUES
(1, '+٤٥', 'سوقاً دولياً', '', '', 1),
(2, '١٢٠ ألف', 'طن سنوياً', '', '', 2),
(3, '٣', 'قطاعات رئيسية', '', '', 3),
(4, '٢٤/٧', 'متابعة التوريد', '', '', 4);

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `client_position` varchar(255) NOT NULL DEFAULT '',
  `client_company` varchar(255) NOT NULL DEFAULT '',
  `content` text DEFAULT NULL,
  `avatar_url` varchar(500) NOT NULL DEFAULT '',
  `rating` tinyint(4) NOT NULL DEFAULT 5,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_content`
--
ALTER TABLE `about_content`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_log_admin` (`admin_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `fk_cat_sector` (`sector_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comparison_rows`
--
ALTER TABLE `comparison_rows`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_info`
--
ALTER TABLE `contact_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `digital_ecosystem`
--
ALTER TABLE `digital_ecosystem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hero_slides`
--
ALTER TABLE `hero_slides`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_prod_cat` (`category_id`);

--
-- Indexes for table `sectors`
--
ALTER TABLE `sectors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `setting_key` (`setting_key`);

--
-- Indexes for table `site_values`
--
ALTER TABLE `site_values`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_content`
--
ALTER TABLE `about_content`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `comparison_rows`
--
ALTER TABLE `comparison_rows`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contact_info`
--
ALTER TABLE `contact_info`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `digital_ecosystem`
--
ALTER TABLE `digital_ecosystem`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hero_slides`
--
ALTER TABLE `hero_slides`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `sectors`
--
ALTER TABLE `sectors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `site_values`
--
ALTER TABLE `site_values`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `stats`
--
ALTER TABLE `stats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD CONSTRAINT `fk_log_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk_cat_sector` FOREIGN KEY (`sector_id`) REFERENCES `sectors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_prod_cat` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
