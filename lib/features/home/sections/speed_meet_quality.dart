import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/themes/colors.dart';

class SpeedMeetQuality extends StatelessWidget {
  const SpeedMeetQuality({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Container(
          width: double.infinity,
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: RichText(
            textAlign: TextAlign.left,
            text: TextSpan(
              style: GoogleFonts.museoModerno(
                fontSize: 64,
                fontWeight: FontWeight.w600,
                color: AppColors.black,
                height: 1.4,
              ),
              children: [
                const TextSpan(text: 'Speed Meets '),
                TextSpan(
                  text: 'Quality',
                  style: GoogleFonts.museoModerno(
                    fontSize: 64,
                    fontWeight: FontWeight.w600,
                    color: AppColors.blue,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ),

        const SizedBox(height: 32),

        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              const SizedBox(width: 32),
              Image.asset(
                'assets/images/home/section4/kindletters.png',
                width: MediaQuery.of(context).size.width * 0.8,
              ),
              const SizedBox(width: 16),
              Image.asset(
                'assets/images/home/section4/kindletters.png',
                width: MediaQuery.of(context).size.width * 0.8,
              ),
              const SizedBox(width: 16),
              Image.asset(
                'assets/images/home/section4/kindletters.png',
                width: MediaQuery.of(context).size.width * 0.8,
              ),
            ],
          ),
        ),

        const SizedBox(height: 100),

        Center(
          child: MouseRegion(
            cursor: SystemMouseCursors.click,
            child: GestureDetector(
              onTap: () {
                // Handle tap action
              },
              child: Container(
                height: 56,
                constraints: const BoxConstraints(minWidth: 80),
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 4,
                ),
                decoration: BoxDecoration(
                  color: AppColors.black,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'See full case study',
                      style: GoogleFonts.poppins(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        height: 1,
                      ),
                    ),
                    const SizedBox(width: 8),
                    const Icon(Icons.add, color: Colors.white, size: 24),
                  ],
                ),
              ),
            ),
          ),
        ),

        const SizedBox(height: 120),
      ],
    );
  }
}
