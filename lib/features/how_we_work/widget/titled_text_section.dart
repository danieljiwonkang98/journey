import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/themes/colors.dart';

class TitledTextSection extends StatelessWidget {
  final String title;
  final String subtitle;

  const TitledTextSection({
    super.key,
    required this.title,
    required this.subtitle,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: GoogleFonts.museoModerno(
            color: AppColors.black,
            fontSize: 56,
            fontWeight: FontWeight.w600,
            height: 1.5,
          ),
        ),
        const SizedBox(height: 12),
        Text(
          subtitle,
          style: GoogleFonts.poppins(
            color: const Color(0xFF454545),
            fontSize: 18,
            fontWeight: FontWeight.w400,
            height: 1.6,
            letterSpacing: 0.09,
          ),
        ),
      ],
    );
  }
}
