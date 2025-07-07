import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/widgets/chat_about_widget.dart';
import 'package:journey/core/widgets/core_app_bar.dart';
import 'package:url_launcher/url_launcher.dart';

class KindlettersDetailView extends StatelessWidget {
  const KindlettersDetailView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CoreAppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Image.asset(
                'assets/images/works/kindletters/kindletters_header.png',
                width: MediaQuery.of(context).size.width,
                fit: BoxFit.cover,
              ),

              const SizedBox(height: 64),

              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'KindLetters',
                  style: GoogleFonts.museoModerno(
                    color: const Color(0xFF2C2C2C),
                    fontSize: 48,
                    fontWeight: FontWeight.w600,
                    height: 1.5,
                  ),
                ),
              ),

              const SizedBox(height: 8),

              Text(
                'A community built on empathy',
                style: GoogleFonts.poppins(
                  color: const Color(0xFF454545),
                  fontSize: 24,
                  fontWeight: FontWeight.w500,
                  height: 1.6,
                  letterSpacing: 0.12,
                ),
              ),
              const SizedBox(height: 8),

              Text(
                'We wanted to create a space where people could speak without being judged — and be heard by someone who cares.',
                style: GoogleFonts.poppins(
                  color: const Color(0xFF454545),
                  fontSize: 20,
                  fontWeight: FontWeight.w400,
                  height: 1.6,
                  letterSpacing: 0.1,
                ),
              ),
              const SizedBox(height: 32),

              Align(
                alignment: Alignment.centerLeft,
                child: Row(
                  children: [
                    Text(
                      'Emotional UI',
                      style: GoogleFonts.poppins(
                        color: const Color(0xFF808080),
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        height: 1.6,
                        letterSpacing: 0.07,
                      ),
                    ),
                    const SizedBox(width: 12),

                    Container(
                      width: 6,
                      height: 6,
                      decoration: BoxDecoration(
                        color: const Color(0xFF2D91F3),
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Text(
                      'Community',
                      style: GoogleFonts.poppins(
                        color: const Color(0xFF808080),
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        height: 1.6,
                        letterSpacing: 0.07,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Container(
                      width: 6,
                      height: 6,
                      decoration: BoxDecoration(
                        color: const Color(0xFFF4E654),
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),

                    const SizedBox(width: 12),

                    Text(
                      'UX Research',
                      style: GoogleFonts.poppins(
                        color: const Color(0xFF808080),
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        height: 1.6,
                        letterSpacing: 0.07,
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              Container(
                height: 1,
                alignment: Alignment.center,
                decoration: const BoxDecoration(color: Color(0xFFE6E6E6)),
              ),

              const SizedBox(height: 32),
              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Description',
                  style: GoogleFonts.poppins(
                    color: const Color(0xFF454545),
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    height: 1.6,
                    letterSpacing: 0.08,
                  ),
                ),
              ),

              const SizedBox(height: 8),
              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'KindLetters is a heartfelt platform where users can share their feelings anonymously and receive comforting replies. It\'s built on trust, softness, and sincerity - not metrics.',
                  style: GoogleFonts.poppins(
                    color: const Color(0xFF808080),
                    fontSize: 18,
                    fontWeight: FontWeight.w400,
                    height: 1.6,
                    letterSpacing: 0.09,
                  ),
                ),
              ),

              const SizedBox(height: 32),

              MouseRegion(
                cursor: SystemMouseCursors.click,
                child: GestureDetector(
                  onTap: () {
                    launchUrl(Uri.parse('https://kindletters.xyz/'));
                  },
                  child: Image.asset(
                    'assets/images/works/kindletters/visit_site_button.png',
                    height: 36,
                    width: 129,
                  ),
                ),
              ),

              const SizedBox(height: 64),
              Row(
                children: [
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/kindletters/kindletters1.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/kindletters/kindletters2.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Image.asset(
                'assets/images/works/kindletters/kindletters3.png',
                width: double.infinity,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/kindletters/kindletters4.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/kindletters/kindletters5.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Image.asset(
                'assets/images/works/kindletters/kindletters6.png',
                width: double.infinity,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/kindletters/kindletters7.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/kindletters/kindletters8.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 140),
              ChatAboutWidget(),
            ],
          ),
        ),
      ),
    );
  }
}
