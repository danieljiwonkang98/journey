import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/themes/colors.dart';
import 'package:journey/core/widgets/chat_about_widget.dart';
import 'package:journey/core/widgets/core_app_bar.dart';
import 'package:journey/features/how_we_work/widget/titled_info_box.dart';
import 'package:journey/features/how_we_work/widget/titled_text_section.dart';
import 'package:journey/features/how_we_work/widget/pricing_comparison_row.dart';
import 'package:journey/features/how_we_work/widget/metric_box.dart';
import 'package:flutter/services.dart';

class HowWeWorkView extends StatelessWidget {
  const HowWeWorkView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CoreAppBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: Column(
            children: [
              const SizedBox(height: 140),

              Text(
                'Fast, Quality Apps Without the Risk',
                style: GoogleFonts.museoModerno(
                  color: AppColors.black,
                  fontSize: 72,
                  fontWeight: FontWeight.w600,
                  height: 1.4,
                  letterSpacing: -2.16,
                ),
              ),
              const SizedBox(height: 32),

              Text(
                'We build your app faster than agencies, better than freelancers – or you get your money back.',
                style: GoogleFonts.poppins(
                  color: AppColors.black,
                  fontSize: 20,
                  fontWeight: FontWeight.w500,
                  height: 1.6,
                  letterSpacing: 0.1,
                ),
              ),

              const SizedBox(height: 100),
              Image.asset('assets/images/how_we_work/100percent.png'),

              const SizedBox(height: 80),

              Text(
                '100% Money-Back Guarantee',
                style: GoogleFonts.museoModerno(
                  color: AppColors.black,
                  fontSize: 48,
                  fontWeight: FontWeight.w600,
                  height: 1.5,
                ),
              ),

              const SizedBox(height: 16),
              Text(
                "Don't love your app? Full refund, no questions asked.",
                style: GoogleFonts.poppins(
                  color: const Color(0xFF2C2C2C),
                  fontSize: 20,
                  fontWeight: FontWeight.w500,
                  height: 1.6,
                  letterSpacing: 0.1,
                ),
              ),

              const SizedBox(height: 120),

              Row(
                children: [
                  Expanded(
                    child: TitledInfoBox(
                      title: 'Faster Delivery',
                      subtitle: 'Apps ready in weeks, not months',
                    ),
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    child: TitledInfoBox(
                      title: 'Senior Team',
                      subtitle: 'Designer + developer working together',
                    ),
                  ),
                  const SizedBox(width: 20),
                  Expanded(
                    child: TitledInfoBox(
                      title: 'Zero Risk',
                      subtitle: 'Full refund if you\'re not satisfied',
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 80),

              MouseRegion(
                cursor: SystemMouseCursors.click,
                child: GestureDetector(
                  onTap: () {
                    // TODO: Add tap handling
                  },
                  child: Image.asset(
                    'assets/images/how_we_work/start_risk_free_button.png',
                    height: 64,
                    width: 386,
                  ),
                ),
              ),

              const SizedBox(height: 140),

              Container(
                alignment: Alignment.centerLeft,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    TitledTextSection(
                      title: 'Zero Risk, Full Refund',
                      subtitle:
                          "Don't love your app? Get every penny back. No questions asked.",
                    ),

                    const SizedBox(height: 53),
                    Container(
                      height: 1,
                      color: const Color(0xFFE6E6E6),
                      width: double.infinity,
                    ),
                    const SizedBox(height: 53),

                    TitledTextSection(
                      title: 'No Handoffs, No Delays',
                      subtitle:
                          "Designer and developer work as one. No miscommunication, no surprises.",
                    ),

                    const SizedBox(height: 53),
                    Container(
                      height: 1,
                      color: const Color(0xFFE6E6E6),
                      width: double.infinity,
                    ),
                    const SizedBox(height: 53),

                    TitledTextSection(
                      title: 'Speed Without Compromise',
                      subtitle:
                          "Agencies take months. We deliver in weeks — without sacrificing quality.",
                    ),

                    const SizedBox(height: 53),
                    Container(
                      height: 1,
                      color: const Color(0xFFE6E6E6),
                      width: double.infinity,
                    ),
                    const SizedBox(height: 53),

                    TitledTextSection(
                      title: 'Exclusive Attention',
                      subtitle:
                          "We only take 6 projects at a time. You get our full focus.\nCurrently serving 4 of 6 clients.",
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 140),

              Text(
                'Why We\'re the Smart Choice',
                textAlign: TextAlign.center,
                style: GoogleFonts.museoModerno(
                  color: const Color(0xFF2C2C2C),
                  fontSize: 64,
                  fontWeight: FontWeight.w600,
                  height: 1.4,
                ),
              ),

              const SizedBox(height: 48),
              const PricingComparisonRow(
                row1Text: 'Freelancer',
                row2Text: 'Our Agency',
                row3Text: 'Enterprise Agencies',
                isHighlighted: true,
              ),
              const SizedBox(height: 37),
              const PricingComparisonRow(
                row1Text: '\$5K–\$15K projects',
                row2Text: '\$15K–\$125K projects',
                row3Text: '\$100K–\$500K+ projects',
              ),
              const SizedBox(height: 37),
              const PricingComparisonRow(
                row1Text: 'No guarantees',
                row2Text: 'Money-back guarantee',
                row3Text: 'Complex contracts',
              ),
              const SizedBox(height: 37),
              const PricingComparisonRow(
                row1Text: 'Solo developers',
                row2Text: 'Senior integrated team',
                row3Text: 'Large teams with overhead',
              ),
              const SizedBox(height: 37),
              const PricingComparisonRow(
                row1Text: 'Variable quality',
                row2Text: 'Consistent senior work',
                row3Text: 'Process-heavy delivery',
              ),
              const SizedBox(height: 37),
              const PricingComparisonRow(
                row1Text: 'High project risk',
                row2Text: 'Zero risk to you',
                row3Text: 'Expensive but slow',
              ),
              const SizedBox(height: 80),

              Text(
                'Why settle for freelancer uncertainty or pay enterprise premiums? We deliver senior-level apps at fair project rates — with full money-back guarantee.',
                textAlign: TextAlign.center,
                style: GoogleFonts.poppins(
                  color: const Color(0xFF808080),
                  fontSize: 20,
                  fontWeight: FontWeight.w500,
                  height: 1.6,
                  letterSpacing: 0.1,
                ),
              ),
              const SizedBox(height: 158),
              Text(
                'Performance Metrics',
                style: GoogleFonts.museoModerno(
                  color: const Color(0xFF2C2C2C),
                  fontSize: 40,
                  fontWeight: FontWeight.w600,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 31),

              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const MetricBox(text: '100% Client Satisfaction'),
                  const SizedBox(width: 20),
                  const MetricBox(text: '100% On-Time Delivery'),
                  const SizedBox(width: 20),
                  const MetricBox(text: 'Reached Top 40 in App Store'),
                  const SizedBox(width: 20),
                  const MetricBox(
                    text: '0 Refunds Processed\n(last 12 months)',
                  ),
                ],
              ),

              const SizedBox(height: 200),
              ChatAboutWidget(),
            ],
          ),
        ),
      ),
    );
  }
}
