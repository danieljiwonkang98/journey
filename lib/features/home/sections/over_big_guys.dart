import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/themes/colors.dart';

class OverBigGuys extends StatelessWidget {
  const OverBigGuys({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: const EdgeInsets.symmetric(horizontal: 32),
      decoration: BoxDecoration(
        color: const Color(0xFFF7F7F7),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        children: [
          const SizedBox(height: 120),
          Text(
            'Why Choose Us Over the Big Guys?',
            textAlign: TextAlign.center,
            style: GoogleFonts.museoModerno(
              fontSize: 64,
              fontWeight: FontWeight.w600,
              color: AppColors.black,
              height: 1.4,
            ),
          ),

          const SizedBox(height: 80),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 80),
            child: Image.asset(
              'assets/images/home/section5/big_guys_table.png',
              width: double.infinity,
            ),
          ),
          const SizedBox(height: 140),

          Text(
            'Value-Based Pricing Tiers',
            textAlign: TextAlign.center,
            style: GoogleFonts.museoModerno(
              fontSize: 64,
              fontWeight: FontWeight.w600,
              color: AppColors.black,
              height: 1.4,
            ),
          ),
          const SizedBox(height: 56),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                'assets/images/home/section5/valuebased1.png',
                width: MediaQuery.of(context).size.width * 0.27,
              ),
              const SizedBox(width: 8),
              Image.asset(
                'assets/images/home/section5/valuebased2.png',
                width: MediaQuery.of(context).size.width * 0.27,
              ),
              const SizedBox(width: 8),
              Image.asset(
                'assets/images/home/section5/valuebased3.png',
                width: MediaQuery.of(context).size.width * 0.27,
              ),
            ],
          ),
          const SizedBox(height: 120),
        ],
      ),
    );
  }
}
