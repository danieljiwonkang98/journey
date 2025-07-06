import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/themes/colors.dart';

class FromBriefToBuild extends StatelessWidget {
  const FromBriefToBuild({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      // height: MediaQuery.of(context).size.height * 0.95,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const SizedBox(height: 180),

            //* Hero image
            Align(
              alignment: Alignment.centerLeft,
              child: RichText(
                text: TextSpan(
                  style: GoogleFonts.museoModerno(
                    fontSize: 64,
                    fontWeight: FontWeight.w600,
                    color: Colors.black,
                  ),
                  children: [
                    const TextSpan(text: 'From Brief to Build in '),
                    TextSpan(
                      text: '7 Days',
                      style: GoogleFonts.museoModerno(
                        fontSize: 64,
                        color: AppColors.blue,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ),

            //* Show list
            const SizedBox(height: 60),
            Image.asset(
              'assets/images/home/section3/7dayflow.png',
              width: MediaQuery.of(context).size.width - 80,
            ),
            const SizedBox(height: 60),
          ],
        ),
      ),
    );
  }
}
