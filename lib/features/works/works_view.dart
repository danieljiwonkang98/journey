import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/routes/app_routes.dart';
import 'package:journey/core/themes/colors.dart';
import 'package:journey/core/widgets/chat_about_widget.dart';
import 'package:journey/core/widgets/core_app_bar.dart';

class WorksView extends StatelessWidget {
  const WorksView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CoreAppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 32),
          child: Column(
            children: [
              SizedBox(height: 160),
              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'What We Make',
                  style: GoogleFonts.museoModerno(
                    color: AppColors.black,
                    fontSize: 72,
                    fontWeight: FontWeight.w600,
                    height: 1.4,
                    letterSpacing: -2.16,
                  ),
                ),
              ),

              const SizedBox(height: 40),

              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'We invent, test, and build \u2014 before being asked.\nThese are projects we created because we couldn\'t NOT make them.',
                  style: GoogleFonts.poppins(
                    color: const Color(0xFF454545),
                    fontSize: 24,
                    fontWeight: FontWeight.w500,
                    height: 1.6,
                    letterSpacing: 0.12,
                  ),
                ),
              ),

              const SizedBox(height: 28),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  SvgPicture.asset(
                    'assets/images/yellow_dash.svg',
                    width: 22,
                    height: 23,
                  ),

                  const SizedBox(width: 8),

                  Text(
                    'From emotional tools to technical products, every project reflects how we think and how we work — fast, curious, and hands-on.',
                    style: GoogleFonts.poppins(
                      color: const Color(0xFF808080),
                      fontSize: 18,
                      fontWeight: FontWeight.w400,
                      height: 1.6,
                      letterSpacing: 0.09,
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 100),

              //* List Projects
              Row(
                children: [
                  Expanded(
                    child: MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: GestureDetector(
                        onTap: () {
                          Get.toNamed(AppRoutes.KINDLETTERS_DETAIL);
                        },
                        child: Image.asset(
                          'assets/images/works/kindletters.png',
                          fit: BoxFit.contain,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: GestureDetector(
                        onTap: () {
                          Get.toNamed(AppRoutes.HYPE_DETAIL);
                        },
                        child: Image.asset(
                          'assets/images/works/hype.png',
                          fit: BoxFit.contain,
                        ),
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 80),

              Row(
                children: [
                  Expanded(
                    child: MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: GestureDetector(
                        onTap: () {
                          Get.toNamed(AppRoutes.INTERVIEWSHIELD_DETAIL);
                        },
                        child: Image.asset(
                          'assets/images/works/interviewshield.png',
                          fit: BoxFit.contain,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: MouseRegion(
                      cursor: SystemMouseCursors.click,
                      child: GestureDetector(
                        onTap: () {
                          Get.toNamed(AppRoutes.RAZORCODE_DETAIL);
                        },
                        child: Image.asset(
                          'assets/images/works/razorcode.png',
                          fit: BoxFit.contain,
                        ),
                      ),
                    ),
                  ),
                ],
              ),

              const SizedBox(height: 140),

              ChatAboutWidget(),
            ],
          ),
        ),
      ),
    );
  }
}
