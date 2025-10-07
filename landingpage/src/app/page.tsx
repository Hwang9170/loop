'use client'

import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LineChart as RLineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Menu, Check, X, ChevronDown, Sparkles, TrendingUp, Compass, BarChart3, Clock, ShieldCheck, MailPlus, ArrowUpRight } from 'lucide-react'
import { useForm, ValidationError } from '@formspree/react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline'
}

const Button = ({ variant = 'primary', className = '', children, type = 'button', ...props }: ButtonProps) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'
  const variantStyles =
    variant === 'ghost'
      ? 'bg-transparent text-gray-700 hover:bg-white/80'
      : variant === 'outline'
        ? 'border border-gray-300 bg-white text-gray-800 hover:border-gray-400'
        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500'

  return (
    <button type={type} className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  )
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className = '', ...props }: InputProps) => (
  <input
    className={`h-11 w-full rounded-full border border-gray-300 bg-white/80 px-4 text-sm shadow-sm transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    {...props}
  />
)

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = ({ className = '', ...props }: TextareaProps) => (
  <textarea
    className={`min-h-[140px] w-full rounded-3xl border border-gray-300 bg-white/80 px-4 py-3 text-sm shadow-sm transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    {...props}
  />
)

type CardProps = {
  className?: string
  children: ReactNode
}

const Card = ({ className = '', children }: CardProps) => (
  <div className={`rounded-3xl border border-gray-200 bg-white/80 shadow-md backdrop-blur ${className}`}>{children}</div>
)

type CardSectionProps = {
  className?: string
  children: ReactNode
}

const CardHeader = ({ className = '', children }: CardSectionProps) => (
  <div className={`px-6 py-5 ${className}`}>{children}</div>
)

const CardContent = ({ className = '', children }: CardSectionProps) => (
  <div className={`px-6 py-5 ${className}`}>{children}</div>
)

const CardTitle = ({ className = '', children }: CardSectionProps) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
)

type BadgeProps = {
  children: ReactNode
  className?: string
}

const Badge = ({ children, className = '' }: BadgeProps) => (
  <span className={`inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ${className}`}>
    {children}
  </span>
)

type StatCardProps = {
  value: string
  label: string
  description: string
}

const StatCard = ({ value, label, description }: StatCardProps) => (
  <Card className="flex flex-col gap-2 border-none bg-gradient-to-br from-white/80 to-blue-50/60 p-6 shadow-sm">
    <span className="text-3xl font-semibold text-gray-900">{value}</span>
    <span className="text-sm font-medium uppercase tracking-wide text-blue-600">{label}</span>
    <p className="text-sm text-gray-600">{description}</p>
  </Card>
)

const insightStats = [
  {
    value: '12,540+',
    label: '분석된 기록',
    description: '기록을 데이터로 전환해 맥락과 감정을 추적했습니다.',
  },
  {
    value: '81%',
    label: '명료도 상승',
    description: '1주 사용 후 “나를 더 잘 이해한다”라고 답한 사용자 비율.',
  },
  {
    value: '3분',
    label: '평균 작성 시간',
    description: '간결한 프롬프트와 AI 요약으로 기록 부담을 줄였습니다.',
  },
]

const loopSteps = [
  {
    id: 'capture',
    label: '기록',
    title: '자유로운 기록이 자연스럽게 구조화됩니다',
    description:
      '그날의 사건, 감정, 키워드를 적으면 AI가 문장을 스캔해 감정 스펙트럼과 에너지 레벨을 바로 태깅합니다.',
    bullets: ['감정 단어 추천과 자동 태깅', '텍스트·음성·사진 기록 지원', '기록 흐름을 깨지 않는 프롬프트'],
    metric: { label: 'Clarity score after 5 entries', value: '+34%' },
    insight: '“지금 내 감정은?”이라는 질문에 머뭇거리지 않도록, 기록 즉시 감정 맵을 보여줍니다.',
  },
  {
    id: 'analyze',
    label: '분석',
    title: '감정과 패턴을 AI가 실시간으로 읽어냅니다',
    description:
      'AI는 감정 강도, 원인, 반복된 주제를 추출하고, 하루의 기분 흐름을 수치로 요약해줍니다.',
    bullets: ['감정·키워드·분위기 지표 생성', '반복되는 사건과 감정 상관관계 포착', '스트레스 요인과 회복 지점 추천'],
    metric: { label: 'Pattern detection accuracy', value: '92%' },
    insight: '“왜 피곤한지 모르겠어”라는 순간, 지난 5일간의 피로 단어 빈도를 바로 확인할 수 있습니다.',
  },
  {
    id: 'visualize',
    label: '시각화',
    title: '변화의 흐름을 눈으로 확인합니다',
    description:
      '일·주·월 단위 리포트가 자동 생성되어 감정의 흐름과 중요한 순간을 그래프로 보여줍니다.',
    bullets: ['감정 변화 라인 차트 & 단어 클라우드', '주간 하이라이트와 기분 드라이버 정리', '맞춤 리포트 내보내기'],
    metric: { label: 'Insight adoption', value: '3.2×' },
    insight: '“이번 달은 행복했어”라는 감각을 긍정 감정 비율 80%라는 데이터로 확인합니다.',
  },
  {
    id: 'action',
    label: '인사이트',
    title: '성찰과 성장을 잇는 루프가 완성됩니다',
    description:
      'AI가 코멘트와 리마인드를 전달해 다음 기록을 준비하고, 변화가 이어지는 루프를 만듭니다.',
    bullets: ['정서 컨디션 기반 리마인드', '행동 제안 및 회고 질문 추천', '프라이버시 중심 데이터 저장'],
    metric: { label: 'Habit retention', value: '87%' },
    insight: '“최근 피로감이 높아요. 휴식 시간을 만들어보세요.”라는 맞춤 피드백이 성찰을 돕습니다.',
  },
]

const featureCards = [
  {
    icon: <Sparkles className="h-6 w-6 text-blue-600" />,
    title: 'AI 감정 분석',
    description: '감정, 에너지, 분위기를 수치와 키워드로 자동 분석해 숨은 패턴을 드러냅니다.',
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-600" />,
    title: '시각화 리포트',
    description: '감정 변화 그래프, 단어 클라우드, 주간 브리프를 포함한 리포트를 자동 생성합니다.',
  },
  {
    icon: <Compass className="h-6 w-6 text-blue-600" />,
    title: 'AI 피드백 & 루프',
    description: '맞춤 코멘트와 리마인드를 제공해 기록 → 인사이트 → 변화의 사이클을 유지합니다.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-600" />,
    title: '프라이버시 중심',
    description: '모든 데이터는 암호화하고 익명 모드를 지원해 가장 개인적인 기록도 안전합니다.',
  },
]

const valueProps = [
  {
    label: '기록에서 인사이트로',
    description: '단순한 글쓰기에서 끝나지 않고, 감정 패턴과 변화를 한눈에 볼 수 있도록 돕습니다.',
  },
  {
    label: '나를 데이터로 이해하기',
    description: 'AI가 “무엇이 나를 힘들게 하는지”, “언제 행복한지”를 데이터로 알려줍니다.',
  },
  {
    label: '성찰과 성장의 루프',
    description: '기록 → 분석 → 인사이트 → 행동으로 이어지는 자기 성장 사이클을 만들어줍니다.',
  },
]

const useCases = [
  {
    headline: '“요즘 왜 이렇게 피곤한지 모르겠어.”',
    summary: '최근 5일간 “피로”, “일”, “불안” 키워드가 68% 증가했습니다.',
    followup: 'AI가 에너지 회복을 위한 루틴과 휴식 알림을 제안합니다.',
  },
  {
    headline: '“이번 달은 행복했어.”',
    summary: '긍정 감정 비율 80%, 주요 감정은 “감사”, “함께”, “평온”입니다.',
    followup: '행복감을 높인 행동을 하이라이트로 저장해 다음 달에도 이어갑니다.',
  },
  {
    headline: '“무엇이 나를 힘들게 하는지 알고 싶어.”',
    summary: '반복된 사건과 감정의 상관관계를 분석해 스트레스 드라이버를 보여줍니다.',
    followup: '가장 큰 영향을 주는 요인을 기준으로 맞춤 질문과 리마인드를 전달합니다.',
  },
]

const reportHighlights = [
  '감정 스펙트럼은 지난주 대비 안정감 +12%, 불안 -9%',
  '자주 언급된 단어: “집중”, “협업”, “회복”',
  'AI 코멘트: “수요일 에너지 저하, 휴식 루틴을 리마인드했어요.”',
]

const faqItems = [
  {
    value: 'item-1',
    question: '데이터는 안전하게 보관되나요?',
    answer: 'unlooped는 모든 기록을 암호화해 저장하고, 익명 모드와 내보내기 기능을 제공합니다.',
  },
  {
    value: 'item-2',
    question: 'AI 분석은 얼마나 자주 업데이트되나요?',
    answer: '기록 저장 즉시 감정 분석이 이뤄지고, 주간·월간 리포트는 예약 생성됩니다.',
  },
  {
    value: 'item-3',
    question: '팀이나 코치와 함께 사용할 수 있나요?',
    answer: '대시보드를 통해 코칭 공간과 팀 공유 기능을 준비 중이며, 사전 문의를 받고 있습니다.',
  },
]

const ContactForm = () => {
  const [state, handleSubmit] = useForm('xblzknnb')
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    if (state.errors) {
      setSubmitError('잠시 후 다시 시도해주세요. 네트워크 상태를 확인하거나 직접 이메일을 보내주세요.')
    }
  }, [state.errors])

  useEffect(() => {
    if (state.succeeded) {
      setSubmitError(null)
    }
  }, [state.succeeded])

  if (state.succeeded) {
    return (
      <Card className="border-blue-100 bg-blue-50/80 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
          <Check className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">대기 리스트 참여가 완료되었습니다!</h3>
        <p className="mt-3 text-sm text-gray-600">
          unlooped 베타 소식을 가장 먼저 전해드릴게요. 기다려주셔서 감사합니다.
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <MailPlus className="h-6 w-6 text-blue-600" />
          베타 대기 리스트 신청
        </CardTitle>
        <p className="mt-2 text-sm text-gray-600">
          이메일을 남겨주시면 베타 초대와 인사이트 리포트 샘플을 보내드립니다.
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <form
          className="grid gap-4"
          onSubmit={async (event) => {
            setSubmitError(null)
            try {
              await handleSubmit(event)
            } catch (error) {
              setSubmitError('잠시 후 다시 시도해주세요. 네트워크 상태를 확인하거나 직접 이메일을 보내주세요.')
              console.error('Form submission failed', error)
            }
          }}
        >
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-800">
              이메일
            </label>
            <Input id="email" type="email" name="email" placeholder="you@example.com" required />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-red-500" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-800">
              기대하는 점 또는 현재 고민
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="어떤 기록을 시각화하고 싶으신가요?"
              rows={4}
            />
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-red-500" />
          </div>
          {submitError && (
            <p className="rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">{submitError}</p>
          )}
          <Button type="submit" disabled={state.submitting} className="justify-center">
            {state.submitting ? '보내는 중...' : '베타 참여 신청'}
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>('item-1')
  const [activeLoop, setActiveLoop] = useState(loopSteps[0].id)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const moodTrend = [
    { day: 'Mon', mood: 62 },
    { day: 'Tue', mood: 74 },
    { day: 'Wed', mood: 58 },
    { day: 'Thu', mood: 81 },
    { day: 'Fri', mood: 89 },
    { day: 'Sat', mood: 72 },
    { day: 'Sun', mood: 85 },
  ]

  const currentLoop = loopSteps.find((step) => step.id === activeLoop) ?? loopSteps[0]

  const nav = [
    { label: 'Our Loop', href: '#loop' },
    { label: 'Features', href: '#features' },
    { label: 'Reports', href: '#reports' },
    { label: 'Values', href: '#values' },
    { label: 'Waitlist', href: '#waitlist' },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f6f7fb] via-white to-[#e3ecff] text-gray-800">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="#" className="flex items-center gap-2 font-semibold text-gray-900">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold uppercase tracking-wide text-white">
              un
            </span>
            <span>unlooped</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-gray-900">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" className="rounded-full">로그인</Button>
            <Button className="rounded-full" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
              대기 리스트 참여
            </Button>
          </div>
          <div className="md:hidden">
            <button
              aria-label="Open menu"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 p-2"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div
            className="ml-auto flex h-full w-[85vw] max-w-sm flex-col gap-6 bg-white p-6 shadow-2xl sm:w-[360px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-gray-900">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold uppercase text-white">
                  un
                </span>
                <span>unlooped</span>
              </div>
              <button
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-base text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto grid gap-2">
              <Button variant="ghost" onClick={() => setIsMenuOpen(false)}>
                로그인
              </Button>
              <Button onClick={() => {
                setIsMenuOpen(false)
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                대기 리스트 참여
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-20 pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10 flex flex-col gap-6 text-center lg:text-left">
            <Badge className="mx-auto lg:mx-0">
              <Sparkles className="h-3.5 w-3.5" />
              일기를 시각화해 인사이트를 주는 플랫폼
            </Badge>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl"
            >
              감정을 기록하면, <span className="text-blue-600">나를 데이터로 이해</span>하게 됩니다.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-gray-600 md:text-xl"
            >
              unlooped는 일기를 AI가 분석해 감정, 패턴, 키워드를 추출하고 그래프로 시각화하는 자기 성찰형 플랫폼입니다.
              기록 → 분석 → 인사이트 → 변화로 이어지는 루프를 완성하세요.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center gap-3 sm:flex-row sm:justify-start"
            >
              <Button className="rounded-full" onClick={() => document.getElementById('reports')?.scrollIntoView({ behavior: 'smooth' })}>
                데모 리포트 살펴보기
              </Button>
              <Button
                variant="ghost"
                className="rounded-full border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              >
                대기 리스트 참여
              </Button>
            </motion.div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600 lg:justify-start">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                AI 감정 분석 & 리포트 자동 생성
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                프라이버시 중심 설계
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-blue-600" />
                루프를 만드는 피드백 & 리마인드
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -top-10 left-10 h-24 w-24 rounded-full bg-blue-200/40 blur-2xl" />
            <div className="absolute bottom-6 right-6 h-20 w-20 rounded-full bg-indigo-200/50 blur-2xl" />
            <Card className="relative overflow-hidden border-none bg-white/90 shadow-xl">
              <CardHeader className="flex items-start justify-between border-b border-gray-100 bg-gradient-to-r from-blue-50/80 to-indigo-50/60">
                <div>
                  <CardTitle className="text-base text-gray-900">이번 주 감정 흐름</CardTitle>
                  <p className="mt-1 text-xs text-gray-500">감정 강도와 에너지 레벨의 주간 요약</p>
                </div>
                <Badge className="bg-white/80 text-blue-600">Live</Badge>
              </CardHeader>
              <CardContent>
                <div className="h-60">
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RLineChart data={moodTrend}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#94a3b8" />
                        <YAxis domain={[0, 100]} hide />
                        <Tooltip
                          cursor={{ stroke: '#cbd5f5', strokeWidth: 2 }}
                          contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', padding: '12px' }}
                        />
                        <Line type="monotone" dataKey="mood" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} />
                      </RLineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">차트를 불러오는 중...</div>
                  )}
                </div>
                <div className="mt-4 grid gap-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    주간 긍정 감정 비율 72%, 전주 대비 +8%
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    수요일 집중도 최저, 금요일 회복도 최고
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    AI 코멘트: “피로 단어가 3일 연속 등장, 휴식 루틴을 제안합니다.”
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {insightStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* Loop section */}
      <section id="loop" className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
          <div className="flex flex-col gap-4">
            <Badge>
              <Compass className="h-3.5 w-3.5" />
              unlooped Insight Loop
            </Badge>
            <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">기록에서 변화까지 이어지는 루프</h2>
            <p className="text-base text-gray-600">
              unlooped는 작성, 분석, 시각화, 피드백이 하나의 흐름으로 이어지도록 설계되었습니다.
              각 단계는 다음 행동을 자연스럽게 만들어 자기 성장의 루프를 완성합니다.
            </p>
            <div className="flex flex-wrap gap-2">
              {loopSteps.map((step) => (
                <Button
                  key={step.id}
                  variant={activeLoop === step.id ? 'primary' : 'outline'}
                  className={`rounded-full border ${activeLoop === step.id ? 'border-transparent' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveLoop(step.id)}
                >
                  {step.label}
                </Button>
              ))}
            </div>
          </div>
          <motion.div
            key={currentLoop.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl border border-blue-100/60 bg-white p-8 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{currentLoop.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{currentLoop.description}</p>
              </div>
              <Badge className="bg-blue-50 text-blue-600">{currentLoop.metric.value}</Badge>
            </div>
            <ul className="mt-6 grid gap-2 text-sm text-gray-700">
              {currentLoop.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2 rounded-2xl bg-blue-50/60 px-3 py-2">
                  <Check className="mt-0.5 h-4 w-4 text-blue-600" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-4 text-sm text-blue-700">
              {currentLoop.insight}
            </div>
            <div className="mt-4 text-xs font-medium uppercase tracking-wide text-blue-500">
              {currentLoop.metric.label}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 text-center">
          <Badge>
            <Sparkles className="h-3.5 w-3.5" />
            주요 기능
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold text-gray-900 md:text-4xl">나를 데이터로 이해하는 도구들</h2>
          <p className="mt-3 text-base text-gray-600">
            AI가 감정과 패턴을 해석하고, 시각화 리포트와 코멘트로 성찰을 돕습니다. 프라이버시는 기본값입니다.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featureCards.map((card) => (
            <Card key={card.title} className="border-none bg-white/90 p-6 shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{card.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Reports */}
      <section id="reports" className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.55fr_0.45fr]">
          <Card className="border-blue-100 bg-white/90 shadow-xl">
            <CardHeader className="pb-3">
              <Badge className="mb-3 bg-blue-50 text-blue-600">
                <BarChart3 className="h-3.5 w-3.5" />
                Insight Report
              </Badge>
              <CardTitle className="text-2xl text-gray-900">나의 감정 리포트 미리 보기</CardTitle>
              <p className="mt-2 text-sm text-gray-600">
                주간 감정 흐름, 우세 감정, 반복 키워드를 시각화하여 변화의 방향을 제안합니다.
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-64 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                {isMounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RLineChart data={moodTrend}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#94a3b8" />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip
                        cursor={{ stroke: '#cbd5f5', strokeWidth: 2 }}
                        contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', padding: '12px' }}
                      />
                      <Line type="monotone" dataKey="mood" stroke="#4f46e5" strokeWidth={3} dot={false} />
                    </RLineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-blue-500/80">리포트를 준비하는 중...</div>
                )}
              </div>
              <ul className="mt-6 grid gap-3 text-sm text-gray-600">
                {reportHighlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-blue-600" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <div className="flex flex-col justify-center gap-6">
            <h3 className="text-3xl font-semibold text-gray-900">데이터가 말해주는 나의 변화</h3>
            <p className="text-base text-gray-600">
              단순한 기록을 넘어 감정의 밸런스를 확인하고, 반복되는 패턴을 발견하며, 다음 행동을 제안받을 수 있습니다.
              unlooped 리포트는 매주 자동 생성되어 당신의 감정 여정을 한눈에 보여줍니다.
            </p>
            <div className="grid gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                월간 리포트와 비교해 성장의 방향을 확인합니다.
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                변곡점이 되었던 순간과 감정을 기록과 함께 되짚습니다.
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                AI 코멘트가 다음 루틴과 질문을 제안합니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 text-center">
          <Badge>
            <Sparkles className="h-3.5 w-3.5" />
            사용 시나리오
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold text-gray-900 md:text-4xl">감정의 흐름을 눈으로 확인하세요</h2>
          <p className="mt-2 text-base text-gray-600">
            unlooped는 일상을 기록한 다음 “나는 지금 어떤 상태인가?”라는 질문에 즉시 답하도록 돕습니다.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {useCases.map((useCase) => (
            <Card key={useCase.headline} className="border-none bg-white/90 p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">{useCase.headline}</h3>
              <p className="mt-4 text-sm text-blue-700">{useCase.summary}</p>
              <p className="mt-3 text-sm text-gray-600">{useCase.followup}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Values */}
      <section id="values" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-10 text-center">
          <Badge>
            <Compass className="h-3.5 w-3.5" />
            핵심 가치
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold text-gray-900 md:text-4xl">우리가 지키는 방향성</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {valueProps.map((value) => (
            <Card key={value.label} className="border-none bg-white/90 p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-900">{value.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{value.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
        <div className="mb-8 text-center">
          <Badge>
            <Sparkles className="h-3.5 w-3.5" />
            FAQ
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold text-gray-900">자주 물어보는 질문</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <div key={item.value} className="overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-sm">
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left text-base font-semibold text-gray-900"
                onClick={() => setOpenAccordion((prev) => (prev === item.value ? null : item.value))}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${openAccordion === item.value ? 'rotate-180' : ''}`}
                />
              </button>
              {openAccordion === item.value && (
                <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-600">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="mx-auto max-w-5xl px-4 py-20">
        <Card className="border-none bg-gradient-to-br from-blue-600 to-indigo-600 p-1 shadow-2xl">
          <div className="rounded-[26px] bg-white p-8">
            <div className="grid gap-10 lg:grid-cols-[0.55fr_0.45fr]">
              <div className="flex flex-col gap-5">
                <Badge className="bg-blue-100 text-blue-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  unlooped beta
                </Badge>
                <h2 className="text-3xl font-semibold text-gray-900 md:text-4xl">루프를 완성할 준비가 되셨나요?</h2>
                <p className="text-base text-gray-600">
                  Daily log가 인사이트로 연결되는 경험을 직접 만나보세요. 대기 리스트에 등록하면 베타 초대와 함께
                  감정 리포트 샘플을 보내드립니다.
                </p>
                <ul className="grid gap-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-blue-600" />
                    베타 접근 우선 초대 및 피드백 세션 초대
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-blue-600" />
                    맞춤형 시각화 리포트 샘플 제공
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-blue-600" />
                    감정 루틴 템플릿 & 프롬프트 번들
                  </li>
                </ul>
              </div>
              <ContactForm />
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/40 bg-white/70 backdrop-blur pt-10 pb-6">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm text-gray-600 md:grid-cols-4">
          <div>
            <div className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold uppercase text-white">
                un
              </span>
              <span>unlooped</span>
            </div>
            <p className="text-sm text-gray-600">
              일기를 시각화해 인사이트를 전하는 자기 성찰형 플랫폼. 감정의 변화를 데이터로 이해하세요.
            </p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-900">Product</h4>
            <ul className="grid gap-2">
              <li><a href="#loop" className="hover:text-gray-900">Insight Loop</a></li>
              <li><a href="#features" className="hover:text-gray-900">Features</a></li>
              <li><a href="#reports" className="hover:text-gray-900">Insight Reports</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-900">Company</h4>
            <ul className="grid gap-2">
              <li><a href="#values" className="hover:text-gray-900">Values</a></li>
              <li><a href="#faq" className="hover:text-gray-900">FAQ</a></li>
              <li><a href="#waitlist" className="hover:text-gray-900">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-gray-900">Stay in the loop</h4>
            <p className="text-sm text-gray-600">감정 리포트 템플릿과 베타 소식을 이메일로 받아보세요.</p>
            <Button
              className="mt-3 w-full justify-center"
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            >
              대기 리스트로 이동
            </Button>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200/80 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} unlooped. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
