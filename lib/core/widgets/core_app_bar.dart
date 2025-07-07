import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/routes/app_routes.dart';

class CoreAppBar extends StatelessWidget implements PreferredSizeWidget {
  const CoreAppBar({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(80);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      centerTitle: true,
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      toolbarHeight: 80,
      elevation: 0,
      scrolledUnderElevation: 0,
      surfaceTintColor: Colors.transparent,
      titleSpacing: 0,
      actions: MediaQuery.of(context).size.width > 600
          ? [
              Padding(
                padding: const EdgeInsets.only(right: 32),
                child: InkWell(
                  onTap: () {
                    // TODO: Implement prototype request action
                  },
                  child: Container(
                    height: 48,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 4,
                    ),
                    constraints: const BoxConstraints(minWidth: 80),
                    decoration: BoxDecoration(
                      color: const Color(0xFF2C2C2C),
                      borderRadius: BorderRadius.circular(40),
                    ),
                    child: Center(
                      child: Text(
                        'Get Your 48-Hour Prototype',
                        style: GoogleFonts.poppins(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          height: 1.25,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ]
          : [
              IconButton(
                icon: const Icon(Icons.menu),
                onPressed: () {
                  // TODO: Implement drawer for mobile view
                },
              ),
            ],
      title: Row(
        children: [
          // Logo on the left
          Padding(
            padding: const EdgeInsets.only(left: 32),
            child: MouseRegion(
              cursor: SystemMouseCursors.click,
              child: GestureDetector(
                onTap: () => Get.offNamed(AppRoutes.HOME),
                child: Image.asset(
                  'assets/images/JourneyTextLogo.png',
                  height: 24,
                ),
              ),
            ),
          ),
          // Navigation buttons in center
          if (MediaQuery.of(context).size.width > 600) ...[
            const Spacer(),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                _buildNavButton('WHO WE ARE', AppRoutes.ABOUT),
                _buildNavButton('WORKS', AppRoutes.WORKS),
                _buildNavButton('SERVICES', AppRoutes.HOME),
                _buildNavButton('LET\'S TALK', AppRoutes.HOME),
              ],
            ),
            const Spacer(),
          ] else
            const Spacer(),
        ],
      ),
    );
  }

  Widget _buildNavButton(String title, String route) {
    return TextButton(
      onPressed: () => Get.toNamed(route, preventDuplicates: false),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: Text(
          title,
          style: GoogleFonts.poppins(
            color: Get.isDarkMode ? Colors.white : Colors.black,
            fontSize: 18,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
