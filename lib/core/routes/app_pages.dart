import 'package:get/get.dart';
import 'package:journey/features/home/home_view.dart';
import 'package:journey/features/about/about_view.dart';
import 'app_routes.dart';

class AppPages {
  static final routes = [
    GetPage(name: AppRoutes.HOME, page: () => const HomeView()),
    GetPage(name: AppRoutes.ABOUT, page: () => const AboutView()),
  ];
}
