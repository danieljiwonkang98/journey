import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/widgets/chat_about_widget.dart';
import 'package:journey/core/widgets/core_app_bar.dart';
import 'package:url_launcher/url_launcher.dart';

class HypeDetailView extends StatelessWidget {
  const HypeDetailView({super.key});

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
                'assets/images/works/hype/hype_header.png',
                width: MediaQuery.of(context).size.width,
                fit: BoxFit.cover,
              ),

              const SizedBox(height: 64),

              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'Hype',
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
                'Fuel Your Friendships!',
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
                'What if your friends could vote for you, secretly but positively?',
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
                      'Microinteraction',
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
                      'Playful UI',
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
                      'Mobile App',
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
              //* Description Row
              Row(
                children: [
                  Expanded(
                    child: Column(
                      children: [
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
                            'Hype is a social app that allows users to vote anonymously on playful questions, sparking curiosity and positivity among friends.',
                            style: GoogleFonts.poppins(
                              color: const Color(0xFF808080),
                              fontSize: 18,
                              fontWeight: FontWeight.w400,
                              height: 1.6,
                              letterSpacing: 0.09,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Row(
                    children: [
                      const SizedBox(width: 132),
                      SizedBox(
                        width: 216,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Align(
                              alignment: Alignment.centerLeft,
                              child: Text(
                                'What We Did',
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
                            Text(
                              'Mobile UX Design',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'Product Branding',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'Flutter Development',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 16),
                      SizedBox(
                        width: 216,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Align(
                              alignment: Alignment.centerLeft,
                              child: Text(
                                'Industry',
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
                            Text(
                              'Entertainment',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'Social',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ],
              ),

              const SizedBox(height: 32),

              MouseRegion(
                cursor: SystemMouseCursors.click,
                child: GestureDetector(
                  onTap: () {
                    launchUrl(Uri.parse('https://hypeapp.us/'));
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
                      'assets/images/works/hype/hype1.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/hype/hype2.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Image.asset(
                'assets/images/works/hype/hype3.png',
                width: double.infinity,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/hype/hype4.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/hype/hype5.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Image.asset(
                'assets/images/works/hype/hype6.png',
                width: double.infinity,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/hype/hype7.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/hype/hype8.png',
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
