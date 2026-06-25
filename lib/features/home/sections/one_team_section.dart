import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class OneTeamSection extends StatelessWidget {
  const OneTeamSection({super.key});

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final imageWidth = (width * 0.5).clamp(320.0, 560.0);

    return Container(
      width: double.infinity,
      color: Colors.black,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          const SizedBox(height: 120),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Text(
              'One team, the whole\nway through.',
              textAlign: TextAlign.left,
              style: GoogleFonts.urbanist(
                fontSize: 56,
                fontWeight: FontWeight.w700,
                color: Colors.white,
                height: 1.15,
                letterSpacing: -1,
              ),
            ),
          ),
          const SizedBox(height: 56),
          Center(
            child: SizedBox(
              width: imageWidth,
              child: Image.asset(
                'assets/images/6group.png',
                fit: BoxFit.contain,
              ),
            ),
          ),
          const SizedBox(height: 120),
        ],
      ),
    );
  }
}
