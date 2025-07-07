import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class PricingComparisonRow extends StatelessWidget {
  final String row1Text;
  final String row2Text;
  final String row3Text;
  final bool isHighlighted;

  const PricingComparisonRow({
    super.key,
    required this.row1Text,
    required this.row2Text,
    required this.row3Text,
    this.isHighlighted = false,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          flex: 1,
          child: Container(
            height: 69,
            decoration: BoxDecoration(
              color: isHighlighted ? const Color(0xFFE6E6E6) : null,
              border: !isHighlighted
                  ? Border.all(color: const Color(0xFFE6E6E6), width: 1)
                  : null,
              borderRadius: BorderRadius.circular(60),
            ),
            child: Center(
              child: Text(
                row1Text,
                style: GoogleFonts.poppins(
                  fontSize: 18,
                  fontWeight: FontWeight.w500,
                  color: isHighlighted ? Colors.black : const Color(0xFF808080),
                ),
              ),
            ),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          flex: 2,
          child: Container(
            height: 69,
            decoration: BoxDecoration(
              color: isHighlighted ? const Color(0xFF2D91F3) : null,
              border: !isHighlighted
                  ? Border.all(color: const Color(0xFFE6E6E6), width: 1)
                  : null,
              borderRadius: BorderRadius.circular(60),
            ),
            child: Center(
              child: Text(
                row2Text,
                textAlign: TextAlign.center,
                style: GoogleFonts.poppins(
                  fontSize: 18,
                  fontWeight: isHighlighted ? FontWeight.w500 : FontWeight.w600,
                  color: isHighlighted ? Colors.white : const Color(0xFF000000),
                  height: 1.6,
                  letterSpacing: 0.09,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(width: 16),
        Expanded(
          flex: 1,
          child: Container(
            height: 69,
            decoration: BoxDecoration(
              color: isHighlighted ? const Color(0xFFE6E6E6) : null,
              border: !isHighlighted
                  ? Border.all(color: const Color(0xFFE6E6E6), width: 1)
                  : null,
              borderRadius: BorderRadius.circular(60),
            ),
            child: Center(
              child: Text(
                row3Text,
                style: GoogleFonts.poppins(
                  fontSize: 18,
                  fontWeight: FontWeight.w500,
                  color: isHighlighted ? Colors.black : const Color(0xFF808080),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
