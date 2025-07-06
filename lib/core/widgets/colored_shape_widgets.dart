import 'package:flutter/material.dart';

class CircleWidget extends StatelessWidget {
  final Color color;
  final double size;

  const CircleWidget({super.key, required this.color, this.size = 12});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(color: color, shape: BoxShape.circle),
    );
  }
}

class BarWidget extends StatelessWidget {
  final Color color;
  final double height;
  final double borderRadius;

  const BarWidget({
    super.key,
    required this.color,
    this.height = 12,
    this.borderRadius = 20,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(borderRadius),
      ),
    );
  }
}
