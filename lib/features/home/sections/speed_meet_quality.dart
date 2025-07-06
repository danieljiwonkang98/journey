import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/themes/colors.dart';

class ArrowIcon extends StatelessWidget {
  const ArrowIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 40,
      height: 40,
      child: CustomPaint(painter: ArrowIconPainter()),
    );
  }
}

class ArrowIconPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // Background circle
    final bgPaint = Paint()
      ..color = AppColors.blue
      ..style = PaintingStyle.fill;
    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      size.width / 2,
      bgPaint,
    );

    // Dot
    final dotPaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.fill;
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(10, 18.8887, 2.77778, 2.77778),
        const Radius.circular(1.38889),
      ),
      dotPaint,
    );

    // Arrow
    final arrowPaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.fill;
    final arrowPath = Path()
      ..moveTo(23.4628, 14.5734)
      ..lineTo(25.4268, 14.5734)
      ..lineTo(29.8712, 19.0178)
      ..lineTo(29.8712, 20.9818)
      ..lineTo(25.4268, 25.4263)
      ..lineTo(23.4628, 25.4263)
      ..lineTo(23.4628, 23.4623)
      ..lineTo(25.5363, 21.3887)
      ..lineTo(15.5559, 21.3887)
      ..lineTo(14.167, 19.9998)
      ..lineTo(15.5559, 18.6109)
      ..lineTo(25.5363, 18.6109)
      ..lineTo(23.4628, 16.5374)
      ..lineTo(23.3673, 16.4321)
      ..close();
    canvas.drawPath(arrowPath, arrowPaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class SpeedMeetQuality extends StatelessWidget {
  const SpeedMeetQuality({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        Container(
          width: double.infinity,
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.symmetric(horizontal: 32),
          child: RichText(
            textAlign: TextAlign.left,
            text: TextSpan(
              style: GoogleFonts.museoModerno(
                fontSize: 64,
                fontWeight: FontWeight.w600,
                color: AppColors.black,
                height: 1.4,
              ),
              children: [
                const TextSpan(text: 'Speed Meets '),
                TextSpan(
                  text: 'Quality',
                  style: GoogleFonts.museoModerno(
                    fontSize: 64,
                    fontWeight: FontWeight.w600,
                    color: AppColors.blue,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
        ),

        const SizedBox(height: 32),

        SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              const SizedBox(width: 32),
              Image.asset(
                'assets/images/home/section4/kindletters.png',
                width: MediaQuery.of(context).size.width * 0.8,
              ),
              const SizedBox(width: 16),
              Image.asset(
                'assets/images/home/section4/hype.png',
                width: MediaQuery.of(context).size.width * 0.8,
              ),
              //TODO ADD MORE
            ],
          ),
        ),

        const SizedBox(height: 100),

        Center(
          child: MouseRegion(
            cursor: SystemMouseCursors.click,
            child: GestureDetector(
              onTap: () {
                // Handle tap action
              },
              child: Container(
                constraints: const BoxConstraints(minWidth: 80),
                padding: const EdgeInsets.only(
                  left: 28,
                  right: 12,
                  top: 12,
                  bottom: 12,
                ),
                decoration: BoxDecoration(
                  color: AppColors.black,
                  borderRadius: BorderRadius.circular(48),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'See full case study',
                      style: GoogleFonts.poppins(
                        color: Colors.white,
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        height: 1,
                      ),
                    ),
                    const SizedBox(width: 20),
                    const ArrowIcon(),
                  ],
                ),
              ),
            ),
          ),
        ),

        const SizedBox(height: 120),
      ],
    );
  }
}
