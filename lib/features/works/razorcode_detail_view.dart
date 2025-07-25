import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/widgets/chat_about_widget.dart';
import 'package:journey/core/widgets/core_app_bar.dart';
import 'package:url_launcher/url_launcher.dart';

class RazorCodeDetailView extends StatelessWidget {
  const RazorCodeDetailView({super.key});

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
                'assets/images/works/razorcode/razorcode_header.png',
                width: MediaQuery.of(context).size.width,
                fit: BoxFit.cover,
              ),

              const SizedBox(height: 64),

              Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  'RazorCode',
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
                'Code Any App in Days, Not Weeks',
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
                'Can AI actually reduce dev time without reducing control?',
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
                      'AI Tool',
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
                      'Developer Experience',
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
                      'Productivity',
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
                            'RazorCode is an AI coding assistant that analyzes your entire codebase in real-time and suggests optimal code snippets, voice-controlled commands, and kanban-based task flow.',
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
                              'AI Product UX',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'Voice Interface Design',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'WebApp Architecture',
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
                              'Developer Tools',
                              style: GoogleFonts.poppins(
                                color: const Color(0xFF808080),
                                fontSize: 16,
                                fontWeight: FontWeight.w400,
                                height: 1.6,
                                letterSpacing: 0.08,
                              ),
                            ),
                            Text(
                              'Productivity',
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
                    launchUrl(Uri.parse('https://razorcode.ai/'));
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
                      'assets/images/works/razorcode/razorcode1.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/razorcode/razorcode2.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Image.asset(
                'assets/images/works/razorcode/razorcode3.png',
                width: double.infinity,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/razorcode/razorcode4.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/razorcode/razorcode5.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Image.asset(
                'assets/images/works/razorcode/razorcode6.png',
                width: double.infinity,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/razorcode/razorcode7.png',
                      fit: BoxFit.contain,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Image.asset(
                      'assets/images/works/razorcode/razorcode8.png',
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
