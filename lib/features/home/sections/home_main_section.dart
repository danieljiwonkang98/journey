import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/themes/colors.dart';
import 'package:journey/core/widgets/colored_shape_widgets.dart';

class HomeMainSection extends StatelessWidget {
  const HomeMainSection({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: MediaQuery.of(context).size.height * 0.95,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 160),

            //* Hero image
            SvgPicture.asset('assets/images/home/home1.svg', height: 202),

            const SizedBox(height: 59),

            //*  Colored bars with text
            //? ROW 1
            Row(
              children: [
                const CircleWidget(color: AppColors.yellow),
                const SizedBox(width: 16),
                const Expanded(
                  flex: 2,
                  child: BarWidget(color: AppColors.yellow),
                ),
                const SizedBox(width: 16),
                const CircleWidget(color: AppColors.yellow),
                const SizedBox(width: 16),
                Text(
                  '48-Hour Prototypes',
                  style: GoogleFonts.jetBrainsMono(
                    color: AppColors.textNeutral20,
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    height: 1.0,
                  ),
                ),
                const SizedBox(width: 16),
                const Expanded(
                  flex: 3,
                  child: BarWidget(color: AppColors.blue),
                ),
              ],
            ),

            const SizedBox(height: 20),

            //? ROW 2
            Row(
              children: [
                const Expanded(
                  flex: 3,
                  child: BarWidget(color: AppColors.green),
                ),
                const SizedBox(width: 16),
                const CircleWidget(color: AppColors.green),
                const SizedBox(width: 16),
                Text(
                  'Designer-Developer Unity',
                  style: GoogleFonts.jetBrainsMono(
                    color: AppColors.textNeutral20,
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    height: 1.0,
                  ),
                ),
                const SizedBox(width: 16),
                const Expanded(
                  flex: 2,
                  child: BarWidget(color: AppColors.purple),
                ),
                const SizedBox(width: 16),
                const CircleWidget(color: AppColors.green),
              ],
            ),

            const SizedBox(height: 20),

            //? ROW 3
            Row(
              children: [
                const Expanded(
                  flex: 1,
                  child: BarWidget(color: AppColors.green),
                ),
                const SizedBox(width: 16),
                const CircleWidget(color: AppColors.green),
                const SizedBox(width: 16),
                const Expanded(flex: 3, child: BarWidget(color: AppColors.red)),
                const SizedBox(width: 16),
                const Expanded(
                  flex: 3,
                  child: BarWidget(color: AppColors.green),
                ),
              ],
            ),

            const SizedBox(height: 20),

            //? ROW 4
            Row(
              children: [
                const Expanded(
                  flex: 2,
                  child: BarWidget(color: AppColors.purple),
                ),
                const SizedBox(width: 16),
                const Expanded(flex: 1, child: BarWidget(color: AppColors.red)),
                const SizedBox(width: 16),
                const CircleWidget(color: AppColors.red),
                const SizedBox(width: 16),
                Text(
                  'All Platforms',
                  style: GoogleFonts.jetBrainsMono(
                    color: AppColors.textNeutral20,
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                    height: 1.0,
                  ),
                ),
                const SizedBox(width: 16),
                const Expanded(
                  flex: 4,
                  child: BarWidget(color: AppColors.purple),
                ),
              ],
            ),

            const SizedBox(height: 20),

            //? ROW 4
            Row(
              children: [
                const Expanded(
                  flex: 4,
                  child: BarWidget(color: AppColors.blue),
                ),
                const SizedBox(width: 16),
                const CircleWidget(color: AppColors.yellow),
                const SizedBox(width: 16),
                const Expanded(
                  flex: 5,
                  child: BarWidget(color: AppColors.yellow),
                ),
                const SizedBox(width: 16),
                const CircleWidget(color: AppColors.blue),
              ],
            ),

            const SizedBox(height: 63),

            Align(
              alignment: Alignment.centerRight,
              child: Text(
                "We're a lightning-fast developer and a world-class designer\nworking in perfect sync to bring your digital vision to life — faster\nthan you thought possible.",
                style: GoogleFonts.poppins(
                  color: const Color(0xFF2C2C2C),
                  fontSize: 20,
                  fontWeight: FontWeight.w500,
                  height: 1.6,
                  letterSpacing: 0.1,
                ),
                textAlign: TextAlign.left,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
