import 'package:flutter/material.dart';

class FasterBetterSection extends StatelessWidget {
  const FasterBetterSection({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            MouseRegion(
              cursor: SystemMouseCursors.click,
              child: GestureDetector(
                onTap: () {
                  debugPrint('Image clicked!');
                },
                child: Image.asset(
                  'assets/images/home/section2/home2.png',
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(height: 100),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Image.asset(
                    'assets/images/home/section2/whyfaster.png',
                    height: 180,
                    width: 556,
                  ),
                  const SizedBox(width: 93),
                  Image.asset(
                    'assets/images/home/section2/perfectsync.png',
                    height: 273,
                    width: 540,
                    fit: BoxFit.cover,
                  ),
                  const SizedBox(width: 48),
                  Image.asset(
                    'assets/images/home/section2/whileothersplan.png',
                    height: 273,
                    width: 540,
                    fit: BoxFit.cover,
                  ),
                  const SizedBox(width: 48),
                  Image.asset(
                    'assets/images/home/section2/oneteam.png',
                    height: 273,
                    width: 540,
                    fit: BoxFit.cover,
                  ),
                ],
              ),
            ),
            // Any other widgets below
          ],
        ),
      ),
    );
  }
}
