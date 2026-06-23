import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class HomeMainSection extends StatelessWidget {
  const HomeMainSection({super.key});

  TextStyle get _narrativeStyle => GoogleFonts.urbanist(
        color: Colors.white,
        fontSize: 18,
        fontWeight: FontWeight.w300,
        height: 1.65,
        letterSpacing: 0.2,
      );

  TextSpan _underlined(String text) {
    return TextSpan(
      text: text,
      style: _narrativeStyle.copyWith(
        decoration: TextDecoration.underline,
        decorationColor: Colors.white,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;

    return SizedBox(
      height: size.height,
      width: double.infinity,
      child: ColoredBox(
        color: Colors.black,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 48),
          child: Column(
            children: [
              SizedBox(height: size.height * 0.1),
              RichText(
                textAlign: TextAlign.center,
                text: TextSpan(
                  style: _narrativeStyle,
                  children: [
                    _underlined("We're"),
                    const TextSpan(
                      text:
                          ' drawn to ideas, especially the half-imagined ones.\n'
                          'We love watching them grow into ',
                    ),
                    _underlined('something real'),
                    const TextSpan(
                      text:
                          ", and\nwe'd like to keep meeting them all along the way.\n"
                          "What's left is ",
                    ),
                    _underlined('yours'),
                    const TextSpan(
                      text:
                          '.\nThe one you\'ve only dreamed up once, fleeting,\n'
                          'a little foolish, and all the more fun for it.',
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),
              Text(
                'So —',
                textAlign: TextAlign.center,
                style: GoogleFonts.urbanist(
                  color: Colors.white,
                  fontSize: 16,
                  fontWeight: FontWeight.w300,
                ),
              ),
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(vertical: 24),
                  child: Image.asset(
                    'assets/images/home/flower.gif',
                    fit: BoxFit.contain,
                    width: double.infinity,
                    height: double.infinity,
                  ),
                ),
              ),
              Text(
                "Let's Talk Your",
                textAlign: TextAlign.center,
                style: GoogleFonts.waitingForTheSunrise(
                  color: Colors.white,
                  fontSize: 36,
                  fontWeight: FontWeight.w400,
                  height: 1.2,
                ),
              ),
              const SizedBox(height: 12),
              Image.asset(
                'assets/images/journey/JourneyWhiteLogo.png',
                width: size.width * 0.55,
                fit: BoxFit.contain,
              ),
              SizedBox(height: size.height * 0.08),
            ],
          ),
        ),
      ),
    );
  }
}
