import 'package:get/get.dart';
import 'package:journey/features/home/home_view.dart';
import 'package:journey/features/about/about_view.dart';
import 'package:journey/features/works/works_view.dart';
import 'package:journey/features/works/kindletters_detail_view.dart';
import 'package:journey/features/how_we_work/how_we_work_view.dart';
import 'app_routes.dart';

class AppPages {
  static final routes = [
    GetPage(
      name: AppRoutes.HOME,
      page: () => const HomeView(),
      transition: Transition.noTransition,
    ),
    GetPage(
      name: AppRoutes.ABOUT,
      page: () => const AboutView(),
      transition: Transition.noTransition,
    ),
    GetPage(
      name: AppRoutes.WORKS,
      page: () => const WorksView(),
      transition: Transition.noTransition,
    ),
    GetPage(
      name: AppRoutes.KINDLETTERS_DETAIL,
      page: () => const KindlettersDetailView(),
      transition: Transition.noTransition,
    ),
    GetPage(
      name: AppRoutes.HOW_WE_WORK,
      page: () => const HowWeWorkView(),
      transition: Transition.noTransition,
    ),
  ];
}
