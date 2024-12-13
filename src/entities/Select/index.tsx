"use client";
import { collapseTailwindClassName } from "@/util/collapseTailwindClassName";
import React, { useEffect, useRef, useState } from "react";

// Select 컴포넌트 정의
export default function Select({
  options, // 선택 가능한 옵션 목록
  value, // 현재 선택된 값
  onChange, // 값이 변경될 때 호출되는 함수
  placeholder = "선택하세요", // 기본 표시 텍스트
  className = "", // 추가적인 클래스 이름
  width = "w-full", // 너비 설정
  multiple = false, // 다중 선택 여부
}: {
  options: {
    label: string; // 옵션의 표시 텍스트
    value: string | number; // 옵션의 실제 값
  }[];
  value: string | number | (string | number)[];
  onChange: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  className?: string;
  width?: string;
  multiple?: boolean;
}) {
  const selectRef = useRef<HTMLDivElement>(null); // Select 컴포넌트의 참조
  const [isOpen, setIsOpen] = useState(false); // 드롭다운이 열려 있는지 여부
  const [isTop, setIsTop] = useState(false); // 드롭다운이 위로 열릴지 여부

  // 드롭다운이 열릴 때 스크롤 위치에 따라 드롭다운 방향 설정
  useEffect(() => {
    if (!isOpen || !selectRef.current) return;
    const rect = selectRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom; // 화면 하단과의 거리 계산

    if (spaceBelow < 200) {
      // 하단에 200px 미만의 공간이 있으면
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  }, [isOpen]);

  return (
    <div
      className={collapseTailwindClassName([
        "relative w-full",
        width,
        isOpen ? "z-[+1]" : "",
      ])}
      ref={selectRef}
    >
      {/* 선택된 값 또는 플레이스홀더 표시 */}
      <div
        className={collapseTailwindClassName([
          "w-full py-[8px] px-[16px] text-[15px] border border-gray-300",
          isOpen
            ? `${isTop ? "rounded-t-[6px]" : "rounded-b-[6px]"} `
            : value
            ? " rounded-[6px]"
            : " rounded-[6px] ",
          value ? "text-black" : "text-gray-500",
          className,
        ])}
        onClick={() => setIsOpen(!isOpen)} // 클릭 시 드롭다운 열기/닫기
      >
        {multiple && Array.isArray(value) && value.length > 0
          ? value
              .map(
                (v) =>
                  options.find((option) => option.value === v)?.label
              )
              .join(", ")
          : multiple && placeholder}
        {!multiple &&
          (value
            ? options.find((option) => option.value === value)?.label
            : placeholder)}
        {/* 드롭다운 화살표 */}
        <span
          className={`border-b border-r border-[currentColor] transform rotate-45 -translate-y-1/2 absolute top-1/2 right-[16px] w-[7px] h-[7px] ${
            isOpen ? "rotate-[-135deg]" : ""
          }`}
        ></span>
      </div>
      {isOpen && (
        <div
          className={`absolute top-full left-0 w-full bg-white -mt-px ${
            isTop ? "border-t-0 rounded-b-[6px]" : "border-b-0 rounded-t-[6px]"
          } border border-gray-300 text-[15px]`}
          style={{
            top: isTop ? "100%" : "auto",
            bottom: isTop ? "auto" : "100%",
          }}
        >
          <div
            className={`overflow-auto ${
              multiple ? "max-h-[160px]" : "max-h-[200px]"
            }`}
          >
            {/* 옵션 목록 */}
            {options.map((option) => (
              <div
                key={option.value}
                className={`cursor-pointer px-[16px] py-[8px] ${
                  value === option.value
                    ? "bg-primary text-white" // 선택된 옵션 스타일
                    : " hover:bg-gray-100" // 마우스 오버 시 스타일
                }`}
                onClick={() => {
                  if (multiple) {
                    onChange(
                      (value as (string | number)[]).includes(option.value)
                        ? (value as (string | number)[]).filter((v) => v !== option.value)
                        : [...(value as (string | number)[]), option.value]
                    );
                  } else {
                    onChange(option.value);
                    setIsOpen(false);
                  }
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
          {multiple && (
            <button
              className="w-full text-center h-[40px] font-bold border-t border-gray-300"
              onClick={() => setIsOpen(false)}
            >
              닫기
            </button>
          )}
        </div>
      )}
    </div>
  );
}

Select.displayName = "Select";
