import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:journey/core/routes/app_pages.dart';
import 'package:journey/core/routes/app_routes.dart';
import 'package:journey/core/themes/app_theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'My Company Website',
      theme: AppTheme.lightTheme,
      themeMode: ThemeMode.system,
      initialRoute: AppRoutes.HOME,
      getPages: AppPages.routes,
    );
  }
}
