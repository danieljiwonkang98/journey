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
      title: 'Journey',
      theme: AppTheme.lightTheme,
      themeMode: ThemeMode.system,
      initialRoute: AppRoutes.HOME,
      getPages: AppPages.routes,
      builder: (context, child) {
        final mediaSize = MediaQuery.sizeOf(context);
        final orientation = MediaQuery.orientationOf(context);
        final viewport = View.maybeOf(context);
        final viewportWidth = viewport == null
            ? mediaSize.width
            : viewport.physicalSize.width / viewport.devicePixelRatio;
        final isPhonePortrait =
            orientation == Orientation.portrait &&
            mediaSize.shortestSide < 600;

        debugPrint(
          '[GlobalLayoutGate] '
          'mqWidth=${mediaSize.width.toStringAsFixed(1)}, '
          'mqHeight=${mediaSize.height.toStringAsFixed(1)}, '
          'orientation=$orientation, '
          'viewportWidth=${viewportWidth.toStringAsFixed(1)}, '
          'shortestSide=${mediaSize.shortestSide.toStringAsFixed(1)}, '
          'isPhonePortrait=$isPhonePortrait',
        );

        if (isPhonePortrait) {
          return const _DesktopOnlyBlockedView();
        }

        return child ?? const SizedBox.shrink();
      },
    );
  }
}

class _DesktopOnlyBlockedView extends StatelessWidget {
  const _DesktopOnlyBlockedView();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
          child: Column(
            children: [
              Align(
                alignment: Alignment.topLeft,
                child: Image.asset(
                  'assets/images/journey/JourneyTextLogo.png',
                  height: 24,
                  fit: BoxFit.contain,
                ),
              ),
              const SizedBox(height: 40),
              Expanded(
                child: Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 460),
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF9FBFF),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: const Color(0xFFE5ECFF)),
                      ),
                      child: const Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(
                            Icons.desktop_windows_rounded,
                            size: 48,
                            color: Color(0xFF2D91F3),
                          ),
                          SizedBox(height: 16),
                          Text(
                            'Desktop version only',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Color(0xFF2C2C2C),
                              fontSize: 24,
                              fontWeight: FontWeight.w700,
                              height: 1.3,
                            ),
                          ),
                          SizedBox(height: 12),
                          Text(
                            'This website is currently optimized for desktop. Please open it on a desktop browser for the intended experience.',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Color(0xFF5F5F5F),
                              fontSize: 15,
                              height: 1.6,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
