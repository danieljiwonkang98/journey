import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/themes/colors.dart';

class MetricBox extends StatelessWidget {
  final String text;

  const MetricBox({super.key, required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 124,
      width: 329,
      decoration: BoxDecoration(color: AppColors.gray),
      child: Center(
        child: Text(
          text,
          textAlign: TextAlign.center,
          style: GoogleFonts.museoModerno(
            color: const Color(0xFF2C2C2C),
            fontSize: 20,
            fontWeight: FontWeight.w600,
            height: 1.5,
          ),
        ),
      ),
    );
  }
}
