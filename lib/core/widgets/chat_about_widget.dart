import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/themes/colors.dart';
import 'package:get/get.dart';
import 'package:journey/core/routes/app_routes.dart';

class ChatAboutWidget extends StatelessWidget {
  const ChatAboutWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Center(
          child: RichText(
            textAlign: TextAlign.center,
            text: TextSpan(
              children: [
                TextSpan(
                  text: 'Let\'s Chat About ',
                  style: GoogleFonts.museoModerno(
                    color: AppColors.black,
                    fontSize: 64,
                    fontWeight: FontWeight.w600,
                    height: 1.4,
                  ),
                ),
                TextSpan(
                  text: 'Your Project',
                  style: GoogleFonts.museoModerno(
                    color: AppColors.blue,
                    fontSize: 64,
                    fontWeight: FontWeight.w600,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 24),
        Center(
          child: Text(
            'Just tell us what you\'re building. We\'ll suggest a budget and timeline — instantly.',
            textAlign: TextAlign.center,
            style: GoogleFonts.poppins(
              color: AppColors.black,
              fontSize: 20,
              fontWeight: FontWeight.w500,
              height: 1.6,
              letterSpacing: 0.1,
            ),
          ),
        ),
        const SizedBox(height: 56),
        Center(
          child: Container(
            width: 1144,
            height: 176,
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: const Color(0xFFE6E6E6), width: 1),
              boxShadow: const [
                BoxShadow(
                  color: Color.fromRGBO(0, 0, 0, 0.09),
                  blurRadius: 12,
                  offset: Offset(0, 6),
                ),
              ],
            ),
            child: Stack(
              children: [
                TextField(
                  maxLines: null,
                  expands: true,
                  textAlignVertical: TextAlignVertical.top,
                  decoration: InputDecoration(
                    contentPadding: const EdgeInsets.all(20),
                    border: InputBorder.none,
                    hintText:
                        "Tell us what you're building — e.g. 'A mobile app for real estate consultation MVP.'",
                    hintStyle: GoogleFonts.poppins(
                      color: const Color(0xFFB3B3B3),
                      fontSize: 16,
                      fontWeight: FontWeight.w400,
                      height: 1.25,
                    ),
                  ),
                ),
                Positioned(
                  right: 16,
                  bottom: 16,
                  child: SvgPicture.asset(
                    'assets/images/send_button.svg',
                    width: 40,
                    height: 40,
                  ),
                ),
              ],
            ),
          ),
        ),

        const SizedBox(height: 72),
        Center(
          child: SvgPicture.asset(
            'assets/images/journey_logo.svg',
            width: 56,
            height: 56,
          ),
        ),
        const SizedBox(height: 44),

        Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextButton(
                onPressed: () => Get.toNamed(AppRoutes.HOW_WE_WORK),
                child: Text(
                  'How It Works',
                  style: GoogleFonts.museoModerno(
                    color: const Color(0xFF454545),
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    height: 1.5,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(width: 32),
              TextButton(
                onPressed: () {},
                child: Text(
                  'Why Us',
                  style: GoogleFonts.museoModerno(
                    color: const Color(0xFF454545),
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    height: 1.5,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(width: 32),
              TextButton(
                onPressed: () => Get.toNamed(AppRoutes.WORKS),
                child: Text(
                  'Portfolio',
                  style: GoogleFonts.museoModerno(
                    color: const Color(0xFF454545),
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    height: 1.5,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(width: 32),
              TextButton(
                onPressed: () {},
                child: Text(
                  'Pricing',
                  style: GoogleFonts.museoModerno(
                    color: const Color(0xFF454545),
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    height: 1.5,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 12),

        Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              //TODO include correct address
              Text(
                '123 Teheran-ro, Gangnam-gu, Seoul, 5th Floor',
                style: GoogleFonts.poppins(
                  color: const Color(0xFFB3B3B3),
                  fontSize: 14,
                  fontWeight: FontWeight.w400,
                  height: 18 / 14,
                ),
              ),
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                width: 1,
                height: 14,
                color: const Color(0xFFE6E6E6),
              ),
              Text(
                'design@startjourney.today',
                style: GoogleFonts.poppins(
                  color: const Color(0xFFB3B3B3),
                  fontSize: 14,
                  fontWeight: FontWeight.w400,
                  height: 18 / 14,
                ),
              ),
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 16),
                width: 1,
                height: 14,
                color: const Color(0xFFE6E6E6),
              ),
              Text(
                'Phone : +82-10-2993-0928',
                style: GoogleFonts.poppins(
                  color: const Color(0xFFB3B3B3),
                  fontSize: 14,
                  fontWeight: FontWeight.w400,
                  height: 18 / 14,
                ),
              ),
            ],
          ),
        ),

        const SizedBox(height: 12),

        Center(
          child: Text(
            '© 2025 Journey Inc. All rights reserved.\nFast, integrated development from prototype to product.',
            style: GoogleFonts.poppins(
              color: const Color(0xFFB3B3B3),
              fontSize: 14,
              fontWeight: FontWeight.w400,
              height: 18 / 14,
            ),
            textAlign: TextAlign.center,
          ),
        ),
        const SizedBox(height: 60),
      ],
    );
  }
}
