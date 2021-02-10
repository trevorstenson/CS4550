defmodule Practice.Calc do
  def parse_float(text) do
    {num, _} = Float.parse(text)
    num
  end

  @precedence %{
    "*" => 2,
    "/" => 2,
    "+" => 1,
    "-" => 1
  }

  defp handle_op(op, [], expr), do: {[op], expr}
  defp handle_op(op, stack, expr) do
    [head | tail] = stack
    if @precedence[head] >= @precedence[op] do
      handle_op(op, tail, expr ++ [head])
    else
      {[op | stack], expr}
    end
  end

  defp postfix([], [], expr), do: expr
  defp postfix([], stack, expr) do
    [head | tail] = stack
    postfix([], tail, expr ++ [head])
  end
  defp postfix(tokens, stack, expr) do
    [head | tail] = tokens
    {next_stack, next_expr} =
      case head do
        op when op in ["+", "-", "*", "/"] -> handle_op(op, stack, expr)
        n -> {stack, expr ++ [n]}
      end
    postfix(tail, next_stack, next_expr)
  end

  defp use_op(op, stack) do
    [a, b | tail] = stack
    [Float.to_string(op.(parse_float(b), parse_float(a))) | tail]
  end

  defp solve([], stack), do: parse_float(hd stack)
  defp solve(expr, stack) do
    [head | tail] = expr
    new_stack =
      case head do
        "*" -> use_op(&*/2, stack)
        "/" -> use_op(&//2, stack)
        "+" -> use_op(&+/2, stack)
        "-" -> use_op(&-/2, stack)
        n -> [n | stack]
      end
      solve(tail, new_stack)
  end

  def calc(expr) do
    expr
    |> String.split(~r/\s+/)
    |> postfix([], [])
    |> solve([])
  end

  def factor(1), do: []
  def factor(x) when rem(x, 2) == 0, do: [2] ++ factor(div(x, 2))
  def factor(x) do
    next_num = Enum.find(3..x, fn y -> rem(x, y) == 0 end)
    [next_num] ++ factor(div(x, next_num))
  end

  def palindrome?(s) do
    s = String.downcase(s) |> String.replace(" ", "")
    s == String.reverse(s)
  end
end
