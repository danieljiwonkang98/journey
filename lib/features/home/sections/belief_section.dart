import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class BeliefSection extends StatelessWidget {
  const BeliefSection({super.key, required this.sectionHeight});

  final double sectionHeight;

  static const _headlineLines = [
    'Anyone can ship fast now.',
    "We'd rather build",
    'something worth keeping.',
  ];

  TextStyle _textStyle({
    required double fontSize,
    required FontWeight fontWeight,
    double height = 1.15,
    double letterSpacing = -0.5,
    Color color = Colors.white,
  }) => GoogleFonts.urbanist(
    fontSize: fontSize,
    fontWeight: fontWeight,
    height: height,
    letterSpacing: letterSpacing,
    color: color,
  );

  @override
  Widget build(BuildContext context) {
    return ColoredBox(
      color: Colors.black,
      child: SizedBox(
        height: sectionHeight,
        width: double.infinity,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 48),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  for (var i = 0; i < _headlineLines.length; i++) ...[
                    if (i > 0) const SizedBox(height: 8),
                    Text(
                      _headlineLines[i],
                      style: _textStyle(
                        fontSize: 48,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                  const SizedBox(height: 200),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        width: 180,
                        child: Text(
                          'What we believe',
                          style: _textStyle(
                            fontSize: 22,
                            fontWeight: FontWeight.w400,
                            height: 1.3,
                            letterSpacing: 0,
                          ),
                        ),
                      ),
                      const SizedBox(width: 80),
                      Expanded(
                        child: Text(
                          "Speed used to be a selling point. Now it's a given. "
                          'What lasts is the care in the details — the craft you '
                          "can feel but can't rush. That's the part we obsess over.",
                          style: _textStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.w400,
                            height: 1.45,
                            letterSpacing: 0,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
