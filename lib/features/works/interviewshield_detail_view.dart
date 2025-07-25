import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/widgets/chat_about_widget.dart';
import 'package:journey/core/widgets/core_app_bar.dart';
import 'package:url_launcher/url_launcher.dart';

class InterviewShieldDetailView extends StatelessWidget {
  const InterviewShieldDetailView({super.key});

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
                'assets/images/works/interviewshield/interviewshield_header.png',
                width: MediaQuery.of(context).size.width,
                fit: BoxFit.cover,
              ),

              const SizedBox(height: 64),

              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'InterviewShield',
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
                'AI Cheating Detection for Remote Interviews',
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
                'As AI tools evolve, so do dishonest tactics. We built a system to bring fairness back to remote hiring.',
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
                      'Desktop App',
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
                      'AI',
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
                      'Security UX',
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
                            'InterviewShield monitors system-level activity to detect AI-based cheating in online interviews — from clipboard usage to eye tracking.',
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
                              'Desktop App UX',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'UX/UI Design',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'Analytics Dashboard',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'Performance Metrics',
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
                              'HR Tech',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'Education',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'AI',
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
                    launchUrl(Uri.parse('https://interviewshield.co/'));
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
                      'assets/images/works/interviewshield/interviewshield1.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/interviewshield/interviewshield2.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Image.asset(
                'assets/images/works/interviewshield/interviewshield3.png',
                width: double.infinity,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/interviewshield/interviewshield4.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/interviewshield/interviewshield5.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Image.asset(
                'assets/images/works/interviewshield/interviewshield6.png',
                width: double.infinity,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/interviewshield/interviewshield7.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/interviewshield/interviewshield8.png',
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
