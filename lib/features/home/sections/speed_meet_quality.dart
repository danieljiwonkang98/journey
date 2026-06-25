import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:journey/core/routes/app_routes.dart';
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

/// A single product shown in the auto-scrolling overview gallery.
class _Product {
  const _Product({
    required this.image,
    required this.route,
  });

  final String image;
  final String route;
}

class SpeedMeetQuality extends StatelessWidget {
  const SpeedMeetQuality({super.key});

  static const List<_Product> _products = [
    _Product(
      image: 'assets/images/works/kindletters.png',
      route: AppRoutes.KINDLETTERS_DETAIL,
    ),
    _Product(
      image: 'assets/images/works/hype.png',
      route: AppRoutes.HYPE_DETAIL,
    ),
    _Product(
      image: 'assets/images/works/razorcode.png',
      route: AppRoutes.RAZORCODE_DETAIL,
    ),
    _Product(
      image: 'assets/images/works/interviewshield.png',
      route: AppRoutes.INTERVIEWSHIELD_DETAIL,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final cardWidth = (width * 0.4).clamp(280.0, 520.0);
    final cardHeight = cardWidth * 1.12;

    return Container(
      width: double.infinity,
      color: Colors.black,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          const SizedBox(height: 160),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 32),
            child: Text(
              'Five products, shaped from\nfirst sketch to final ship.',
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

          const SizedBox(height: 48),

          _AutoScrollGallery(
            spacing: 16,
            pixelsPerSecond: 45,
            cardWidth: cardWidth,
            cardHeight: cardHeight,
            children: [
              for (final product in _products)
                _ProductCard(
                  image: product.image,
                  onTap: () => Get.toNamed(product.route),
                ),
            ],
          ),

          const SizedBox(height: 100),

          Center(
            child: MouseRegion(
              cursor: SystemMouseCursors.click,
              child: GestureDetector(
                onTap: () {
                  Get.toNamed(AppRoutes.WORKS);
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
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(48),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        'See full case study',
                        style: GoogleFonts.urbanist(
                          color: AppColors.black,
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
      ),
    );
  }
}

/// A single tappable product tile in the overview gallery.
class _ProductCard extends StatelessWidget {
  const _ProductCard({required this.image, required this.onTap});

  final String image;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Image.asset(
          image,
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}

/// Horizontally auto-scrolling gallery that loops its content infinitely.
///
/// The children are laid out as fixed-size cards and continuously advanced at a
/// constant speed. Once a full set of cards has scrolled past, the offset wraps
/// back by exactly one set width so the loop is seamless.
class _AutoScrollGallery extends StatefulWidget {
  const _AutoScrollGallery({
    required this.children,
    required this.cardWidth,
    required this.cardHeight,
    this.spacing = 16,
    this.pixelsPerSecond = 45,
  });

  final List<Widget> children;
  final double cardWidth;
  final double cardHeight;
  final double spacing;
  final double pixelsPerSecond;

  @override
  State<_AutoScrollGallery> createState() => _AutoScrollGalleryState();
}

class _AutoScrollGalleryState extends State<_AutoScrollGallery>
    with SingleTickerProviderStateMixin {
  final ScrollController _controller = ScrollController();
  late final Ticker _ticker;
  Duration _lastElapsed = Duration.zero;

  double get _loopExtent =>
      widget.children.length * (widget.cardWidth + widget.spacing);

  @override
  void initState() {
    super.initState();
    _ticker = createTicker(_onTick)..start();
  }

  void _onTick(Duration elapsed) {
    if (!_controller.hasClients) {
      _lastElapsed = elapsed;
      return;
    }

    final dt = (elapsed - _lastElapsed).inMicroseconds / 1e6;
    _lastElapsed = elapsed;
    if (dt <= 0) return;

    final loopExtent = _loopExtent;
    if (loopExtent <= 0) return;

    var next = _controller.offset + widget.pixelsPerSecond * dt;
    // Wrap back by one full set so the repeated content loops seamlessly.
    if (next >= loopExtent) next -= loopExtent;
    _controller.jumpTo(next);
  }

  @override
  void dispose() {
    _ticker.dispose();
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final count = widget.children.length;

    return SizedBox(
      height: widget.cardHeight,
      child: ListView.builder(
        controller: _controller,
        scrollDirection: Axis.horizontal,
        physics: const NeverScrollableScrollPhysics(),
        itemBuilder: (context, index) {
          return Padding(
            padding: EdgeInsets.only(right: widget.spacing),
            child: SizedBox(
              width: widget.cardWidth,
              height: widget.cardHeight,
              child: widget.children[index % count],
            ),
          );
        },
      ),
    );
  }
}
