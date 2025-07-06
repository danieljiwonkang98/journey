import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/themes/colors.dart';
import 'package:journey/core/widgets/chat_about_widget.dart';

class DontJustTakeWord extends StatelessWidget {
  const DontJustTakeWord({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 100),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: Text(
            'Don\'t Just Take Our Word For It',
            style: GoogleFonts.museoModerno(
              color: Colors.black,
              fontSize: 64,
              fontWeight: FontWeight.w600,
              height: 1.4, // This gives us the 140% line height
            ),
          ),
        ),
        const SizedBox(height: 48),
        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              const SizedBox(width: 32),
              Image.asset(
                'assets/images/home/section6/Testimonial-1.png',
                height: 300,
              ),
              const SizedBox(width: 16),
              Image.asset(
                'assets/images/home/section6/Testimonial-2.png',
                height: 300,
              ),
              const SizedBox(width: 16),
              Image.asset(
                'assets/images/home/section6/Testimonial-3.png',
                height: 300,
              ),
            ],
          ),
        ),
        const SizedBox(height: 140),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: Image.asset(
            'assets/images/home/section6/graph.png',
            width: MediaQuery.of(context).size.width - 64,
          ),
        ),
        const SizedBox(height: 156),
        Center(
          child: Image.asset(
            'assets/images/home/section6/logos.png',
            height: 140,
          ),
        ),
        const SizedBox(height: 140),

        ChatAboutWidget(),
      ],
    );
  }
}
